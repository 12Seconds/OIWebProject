/* section About background load js */

        function init()
        {

            var content = document.getElementById("about_bg");
    
            var scene = new THREE.Scene();
            
            var camera = new THREE.PerspectiveCamera(45, content.clientWidth / content.clientHeight, 1, 1000);
            var renderer = new THREE.WebGLRenderer({ clearAlpha: 1, alpha:true });
            
            // Custom Camera
            var MainCustomCam = new THREE.OddIdeaCamera( camera, renderer.content);
            camera.lookAt(new THREE.Vector3(50,0,-50));

            renderer.setClearColor(0xBFA0ED);
          //renderer.setSize(content.clientWidth,content.clientHeight);
            renderer.setSize( content.clientWidth, content.clientHeight);
            renderer.shadowMapEnabled = true;
            renderer.shadowMapType = THREE.PCFSoftShadowMap;
         // renderer.autoClear = false;
    
            content.appendChild(renderer.domElement);
        
            camera.position.set(-30,20,30);

    
            var txr_Loader = new THREE.TextureLoader();
            var wallpaper01 = txr_Loader.load("OI_resource/asset/wallpaper/testpaper.jpg");
            var wallpaper02 = txr_Loader.load("OI_resource/asset/wallpaper/testpaper2.jpg");
            var wallpaper03 = txr_Loader.load("OI_resource/asset/wallpaper/testpaper3.jpg");
            var wallpaper04 = txr_Loader.load("OI_resource/asset/wallpaper/testpaper4.jpg");
            var wallpaper05 = txr_Loader.load("OI_resource/asset/wallpaper/testpaper5.jpg");

            var structureG = new THREE.Group(); // 벽 등 구조물 그룹화

            var wallGeometry = new THREE.BoxGeometry(1, 1, 1);
            var wallMaterial = new THREE.MeshLambertMaterial({map:wallpaper01, side:THREE.DoubleSide});
            var wallMaterial2 = new THREE.MeshLambertMaterial({map:wallpaper02, side:THREE.DoubleSide});
            var wallMaterial3 = new THREE.MeshLambertMaterial({map:wallpaper03, side:THREE.DoubleSide});
            var wallMaterial4 = new THREE.MeshLambertMaterial({map:wallpaper04, side:THREE.DoubleSide});
            var wallMaterial5 = new THREE.MeshLambertMaterial({map:wallpaper05, side:THREE.DoubleSide});

            
            // 공간 생성 -----------------------------------------------------------------------
            var floor = new THREE.Mesh(wallGeometry, wallMaterial3);
            floor.scale.set(100,0.2,100);
            floor.castShadow = true;
            //oi.scene.add(oi.floor);

            var ceiling = new THREE.Mesh(wallGeometry, wallMaterial4);
            ceiling.scale.set(100,0.2,100);
            ceiling.position.y = 50;
            //oi.scene.add(oi.ceiling);

            var wall_01 = new THREE.Mesh(wallGeometry, wallMaterial5);
            wall_01.scale.set(100,50,0.2);
            wall_01.position.z = -50;
            wall_01.position.y = 25;
            //oi.scene.add(oi.wall_01);

            var wall_02 = new THREE.Mesh(wallGeometry, wallMaterial5);
            wall_02.scale.set(0.2,50,100);
            wall_02.position.x = 50;
            wall_02.position.y = 25;
            //oi.scene.add(oi.wall_02);

            // 축 추가
            /*
            oi.axes = new THREE.AxisHelper(15);
            oi.scene.add(oi.axes);
            */
            // 광원 추가 -----------------------------------------------------------------------
            var PointLight = new THREE.PointLight(0xffffff);
            PointLight.position.set(0,50,0);
            PointLight.intensity = 2;
           // oi.scene.add(oi.PointLight);

          //  structureG.add(floor, ceiling, wall_01, wall_02, PointLight);
            structureG.add(floor, ceiling, PointLight);
            scene.add(structureG);
            
            // *-----------------------------------------------------------*
            function onResize()
            {
                console.log(content.clientWidth);
                console.log(content.clientHeight);
                console.log(content);
                camera.aspect = content.clientWidth / content.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(content.clientWidth, content.clientHeight);
            }
            
            window.addEventListener('resize', onResize, false); 
            
            /////////////////////////////////////////////////////
            
            // to do..
            
            // create a cube
            var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
            var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.castShadow = true;

            // position the cube
            cube.position.set(0,15,0);
     

            // add the cube to the scene
            scene.add(cube);

            
            var spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(-40, 60, -10);
            spotLight.castShadow = true;
            scene.add(spotLight);

            /////////////////////////////////////////////////////
            var speed=0;
            function renderScene()
            {
                
                cube.rotation.x += 0.04;
                cube.rotation.y += 0.04;
             //   cube.rotation.z += 0.02;
                speed += 0.08;
              //  cube.position.x = (-20 * (Math.sin(speed / 3)));
              //  cube.position.z = (-20 * (Math.cos(speed / 3)));
                cube.position.y = 15;
                cube.position.z = (20 * (Math.sin(speed / 3)));
                cube.position.x = (20 * (Math.cos(speed / 3)));

    
                renderer.render(scene, camera);
                //MainCustomCam.update();
                camera.updateProjectionMatrix();
                requestAnimationFrame(renderScene);
            }
            
         renderScene();
            
        };
        
        window.onload = init;