<?php
    session_start();
    ////////////////////////////////////////////////////////////
    // Bootstrap
    ////////////////////////////////////////////////////////////
    $req = explode('/', $_SERVER['PATH_INFO']);
    //print_r($req);
    array_shift($req);
    //echo "path = ";print_r($req);

    ////////////////////////////////////////////////////////////
    // REQUEST
    ////////////////////////////////////////////////////////////
    $input = file_get_contents('php://input');
    $param = array();
    try {
      $param = json_decode($input, true);
    } catch (Exception $e) {
      print_r($e);
    }
    //echo "param = ";print_r($param);

    ////////////////////////////////////////////////////////////
    // CONTROLLER
    ////////////////////////////////////////////////////////////

    function responseJson($data) {
      header('Content-Type: application/json; charset=UTF-8');
      echo json_encode($data, JSON_UNESCAPED_UNICODE);
      exit;
    }

    ///////////////////////////////////////////////////////////
    //  inclued setting
    ///////////////////////////////////////////////////////////

    include_once 'config.php';

    ///////////////////////////////////////////////////////////
    // start function
    ///////////////////////////////////////////////////////////
    try{
        switch ($req[0]) {
            case 'session':
                doSetSession($param);
                break;
            case 'categoryList':
                doCategoryList($param);
                break;
            case 'saveProduct':
                doSaveProduct($param);
                break;
            case 'getProductList':
                doGetProductList($param);
                break;
            case 'autocomplete':
                doAutocomplete();
                break;
            case 'saveAttribute':
                doSaveAttribute($param);
                break;
        }

    }catch(PDOException $e) {
      responseJson(array(
        'status' => false,
        'error' =>  $e->errorInfo,
      ));
    }

    //////////////////////////////////////////////////////////
    // START
    //////////////////////////////////////////////////////////
    function _genNextCode($text,$table,$column,$order,$length){
        global $pdo;
        try {
            $sql = "select $column code from $table order by id $order limit 1";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $newCode = $stmt->fetchColumn();
            //echo $newCode;
            if($newCode==""){
                $newCode="0";
            }else{
                $newCode = substr($newCode, strlen($text));
            }
            $newCodes = $newCode + 1;
            if(strlen($newCodes) < $length){
                $x = "0";
                for($i=strlen($newCodes); $i<($length-1); $i++){
                    $x = $x."0";
                }
                return $text.$x.$newCodes;
            }else{
                return $text.$newCode;
            }
        } catch (Exception $e) {
            return $e;
        }
    }

    function doSetSession($param){
        //print_r($param);
        $_SESSION["set"][$param['ss1']]= array('two' => $param['ss2'], 'one' => $param['ss1']);
        //print_r($_SESSION["set"]); 

        responseJson(array(
            'status' => true,
            'param' => $_SESSION["set"],
        ));
    }

    function doAutocomplete(){
        $p = trim($_GET['term']);
        echo "Test Autocomplete" . $p;
    }

    function doCategoryList($param){
        global $pdo;
          try {
            $stmt = $pdo->prepare('select id,code,name_th,name_en from product_category where id >= :id');
            $stmt->execute(array(
                ':id'=> $param['id']
            ));
            $category = $stmt->fetchAll(PDO::FETCH_ASSOC);
            responseJson(array(
                'status' => true,
                'category' => $category,
            ));
          } catch (Exception $e) {
            echo "ดึงข้อมูลไม่ได้เหอะ";
          }
    }

    function doSaveProduct($param){
        global $pdo;
        $newProduct=$param;
        //print_r($param);
        $nextCode = _genNextCode('P','product','code','DESC',4);
        try {
            $pdo->beginTransaction();
            if($newProduct["categoryId"]=="-1"){
                $nextCatCode = _genNextCode('C-','product_category','code','DESC',4);
                $sql = "insert into product_category (code,name_th,name_en,description,is_active) values 
                        (:code,:newCategory,:newCategory,:newCategory,'Y')";
                $stmt = $pdo->prepare($sql);
                $stmt->execute(array(
                    ':code' => $nextCatCode,
                    ':newCategory' => $newProduct["newCategory"],
                ));
                $newProduct["categoryId"] = $pdo->lastInsertId();
            }

            $sql = "insert into product (category_id,code,name,price,description) values 
                    (:categoryId,:code,:productName,:productPrice,:productDescription)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(array(
                ':categoryId' => $newProduct["categoryId"],
                ':code' => $nextCode,
                ':productName' => $newProduct["productName"],
                ':productPrice' => $newProduct["productPrice"],
                ':productDescription' => $newProduct["productDescription"],
            ));

            $pdo->commit();
            responseJson(array(
                'status' => true,
            ));

        } catch (PDOException $e) {
            $pdo->rollback();
            responseJson(array(
              'status' => false,
              'error' => $e->errorInfo,
            ));
        }
    }

    function doGetProductList($param){
        global $pdo;
        //print_r($param);
          try {
            if($param['cateId'] == '-1'){
                $cateId = 'category_id';
            }else{
                $cateId = $param['cateId'];
            }
            $sql = "select * from product where category_id = $cateId";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $product = $stmt->fetchAll();
            responseJson(array(
                'status' => true,
                'product' => $product,
            ));
          } catch (PDOException $e) {
            //echo "ดึงข้อมูลไม่ได้เหอะ" . $sql;
            responseJson(array(
              'status' => false,
              'error' => $e->errorInfo,
              'sql' => $sql,
            ));
          }

    }


    function doSaveAttribute($param){
        global $pdo;
        //print_r($param);
        $attriListText = array();
        foreach ($param['attributeList'] as $text) {
            array_push($attriListText,$text['name']);
        }
        $attriList = implode(',',$attriListText);
        try{
            $pdo->beginTransaction();
            $sql = "INSERT INTO attribute (name,detail_list,description) VALUES 
                    (:name,:detail_list,:description)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(array(
                ':name' => $param["attributeName"],
                ':detail_list' => $attriList,
                ':description' => $param["attributeDetail"],
            ));
            $attributeId = $pdo->lastInsertId();

            $sql = "INSERT INTO attribute_detail (attribute_id,name,price) VALUES 
                    (:attribute_id,:name,:price)";
            $stmt = $pdo->prepare($sql);
            foreach ($param['attributeList'] as $list) {
                $stmt->execute(array(
                    ':attribute_id' => $attributeId,
                    ':name' => $list["name"],
                    ':price' => $list["price"],
                ));
            }

            $pdo->commit();
            responseJson(array(
                'status' => true,
            ));
        } catch (PDOException $e) {
            $pdo->rollback();
            responseJson(array(
              'status' => false,
              'error' => $e->errorInfo,
            ));
        }
    }


?>
