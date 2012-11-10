window.onload = function () {

    function evented (evt) {
        var key = evt.keyCode? evt.keyCode : evt.charCode;
        switch(key) {
            case 38 : case 122 : case 119 : case 90 : case 87 : // Flèche haut, z, w, Z, W
            //move_haut();
            break;
            case 40 : case 115 : case 83 : // Flèche bas, s, S
            //move_bas()
            break;
            case 37 : case 113 : case 97 : case 81 : case 65 : // Flèche gauche, q, a, Q, A
            //move_gauche();
            break;
            case 39 : case 100 : case 68 : // Flèche droite, d, D
            //move_droite();
            break;
            default :
                //alert(key);
                // Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
                return true;

            }
        }

        document.documentElement.addEventListener('keydown', evented(e, true), false);
        document.documentElement.addEventListener('keyup', evented(e false), false);
    }