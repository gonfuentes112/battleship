import { Gameboard } from "./gameboard";
import { Player } from "./player";

function gameLogic() {
    const human = new Player("p1");
    const cpu = new Player("p2");

    const ships = {
        "carrier" : {length : 5},
        "battleship" : {length : 4},
        "destroyer" : {length : 3},
        "submarine" : {length : 3},
        "patrolboat" : {length : 2},
    }

    
}