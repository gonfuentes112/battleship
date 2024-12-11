import { gameLogic } from "../gamelogic";

describe('Gamelogic', () => {
    let logic;
    beforeEach(() => {
        logic = gameLogic();
      });
    it('getRandomCoordinates generates coords of the given length', () => {
        const size = 10;
        const lengthOne = 5;
        const lengthTwo = 2;
        const lengthThree = 3;

        const [beginOne, endOne] = logic.getRandomCoordinates(size, lengthOne);
        const rowOneDiff = Math.abs(endOne[0] - beginOne[0]);
        const colOneDiff = Math.abs(endOne[1] - beginOne[1]);
        if (rowOneDiff > 0) {
            expect(rowOneDiff).toEqual(lengthOne);
        } else {
            expect(colOneDiff).toEqual(lengthOne);
        }

        const [beginTwo, endTwo] = logic.getRandomCoordinates(size, lengthTwo);
        const rowTwoDiff = Math.abs(endTwo[0] - beginTwo[0]);
        const colTwoDiff = Math.abs(endTwo[1] - beginTwo[1]);
        if (rowTwoDiff > 0) {
            expect(rowTwoDiff).toEqual(lengthTwo);
        } else {
            expect(colTwoDiff).toEqual(lengthTwo);
        }

        const [beginThree, endThree] = logic.getRandomCoordinates(size, lengthThree);
        const rowThreeDiff = Math.abs(endThree[0] - beginThree[0]);
        const colThreeDiff = Math.abs(endThree[1] - beginThree[1]);
        if (rowThreeDiff > 0) {
            expect(rowThreeDiff).toEqual(lengthThree);
        } else {
            expect(colThreeDiff).toEqual(lengthThree);
        }
    })    
})