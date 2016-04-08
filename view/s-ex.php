         <ul>
            <li><i class="icon-apple"></i><a class="menu" id="home" ui-sref="home" ng-click="menuClick('home')"><span>Home</span></a></li>
            <li class='has-sub'><a class="menu" id="product" ng-click="menuClick('product')"><span>Products</span></a>
               <ul>
                  <li><a class="menu" href='#'><span>Product 1</span></a>
                    <!--  <ul>
                        <li><a href='#'><span>Sub Product</span></a></li>
                        <li class='last'><a href='#'><span>Sub Product</span></a></li>
                     </ul> -->
                  </li>
                  <li><a class="menu" href='#'><span>Product 2</span></a>
                     <!-- <ul>
                        <li><a href='#'><span>Sub Product</span></a></li>
                        <li class='last'><a href='#'><span>Sub Product</span></a></li>
                     </ul> --> 
                  </li>
                  <li><a class="menu" href='#'><span>Product 3</span></a></li>
               </ul>
            </li>
            <li><a class="menu" id="abount" ui-sref="about" ng-click="menuClick('abount')"><span>About</span></a></li>
            <li><a class="menu" id="contact" ng-click="menuClick('contact')"><span>Contact</span></a></li>
            <li class='last'><a class="menu" id="setting" ng-click="menuClick('setting')"><span>Setting</span></a></li>
         </ul>