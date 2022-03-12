import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import produce from 'immer';
import Stone from "./Stone";

const BoardWrapper = styled.div`
  z-index: 0;
  float: left;
  width: 722px;
  height: 720px;
  background-image: url("/images/board.jpg");
`;

const START = 14;
const SIZE_OF_POINT = 37;
// const MAX_POINT = 18;
const MAX_POINT = 8;
const MOK_ROLE = 3

const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;

const CHECK_OMOK_X = [0, 1, -1, -1];
const CHECK_OMOK_Y = [1, 0, -1, 1];

const Board = () => {
  const [data, setData] = useState([]);

  const boardRef = useRef(null);

  useEffect(() => {
    let rows = [];
    for (let i = 0; i <= MAX_POINT; i++) {
      let row = [];
      for (let j = 0; j <= MAX_POINT; j++) {
        row.push(EMPTY);
      }
      rows.push(row);
    }
    setData(rows);
  }, []);

  const handleClick = (e) => {
    const dim = boardRef.current.getBoundingClientRect();
    const x = parseInt((e.clientX - dim.left) / SIZE_OF_POINT);
    const y = parseInt((e.clientY - dim.top) / SIZE_OF_POINT);

    if(x < 0 || y < 0 || x > MAX_POINT || y > MAX_POINT) {
      return;
    }

    setData(
      produce(data, (draft) => {
        draft[y][x] = BLACK;
      })
    );
    
    getResult({x, y, state: data, stone : BLACK })
  };


  /**
   * x,y 를 기반으로 이겼는가를 판단할 필요가 있음
   * @param {*} param0 
   */
  const getResult = ({ x, y, state, stone }) => {
    let isWin = false;
    let curX = 0;
    let curY = 0;

    for (var i = 0; i < CHECK_OMOK_Y.length; i++) {
      let numOfStone = 0;

      for (var j = MOK_ROLE; j > -(MOK_ROLE + 1); j--) {
        // 전체를 기반으로 계산?

        curX = x + CHECK_OMOK_X[i] * j
        curY = y + CHECK_OMOK_Y[i] * j;

        if (curX < 0 || curY < 0 || curX > MAX_POINT || curY > MAX_POINT) {
          continue;
        }

        if (state[curY][curX] == stone) {
          numOfStone++;
        } else if (state[curY][curX] != stone) {
          numOfStone = 0;
        }

        if (numOfStone == MOK_ROLE) {
          console.log(numOfStone);
          console.log("win");
          
        }
      }
    }

    
  };

  const miniMax = ({ x, y, state, stone }) => {
    // 패배시 -1 무승부시 0
    // getResult

    let bestScore = 0;
    for (var i = 0; i < MAX_POINT; i++) {
      for (var j = 0; j < MAX_POINT; j++) {
        if (state[i][j] == EMPTY) {
          // 다음수
          const score = -miniMax({ state, stone });
          if (score > bestScore) {
            bestScore = score;
          }
        }
      }
    }
    return bestScore;
  };

  const miniMaxAction = ({ x, y, state, stone }) => {
    var bestAction = 0;
    var bestScore = 0;
    for (var i = 0; i < MAX_POINT; i++) {
      for (var j = 0; j < MAX_POINT; j++) {
        if (state[i][j] == EMPTY) {
          // 다음수
          const score = -miniMax({ state, stone });
          if (score > bestScore) {
            bestScore = score;
            bestAction = i + "," + j;
          }
        }
      }
    }
    return bestAction;
  };

  const alphaBeta = () => {};

  const alphaBetaAction = () => {};

  return (
    <BoardWrapper ref={boardRef} onClick={handleClick}>
      {data.map((line, y) =>
        line.map((stone, x) =>
          stone != EMPTY ? (
            <Stone
              key={x + ":" + y}
              x={x * SIZE_OF_POINT + START}
              y={y * SIZE_OF_POINT + START}
              color={stone}
            />
          ) : (
            <></>
          )
        )
      )}
    </BoardWrapper>
  );
};

export default Board;
