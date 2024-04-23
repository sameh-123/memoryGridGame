import { useState, useEffect,useLayoutEffect } from "react";
import OudIcon from "./assets/pngegg.png";
import oud from "./assets/phono.jpg";
import {v4 as uuid} from 'uuid'

import Myimages from "./Images.jsx";
let images = [...Myimages];
let vis = [];
export default function App() {
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [clicked, setClicked] = useState(0);
  const [imgs, setImags] = useState(images.slice(0, 10));
  useEffect(()=>{
    images = images
      .map((item) => ({ item, k: Math.random() }))
      .sort((a, b) => a.k - b.k)
      .map(({ item }) => item);
    setImags(images.slice(0, 10));
  },[clicked])

  return (
    <>
      <div className="top">
        <div className="right">
          <img src={OudIcon} alt="icon" className="ic" />
          <div className="gname">MemoMe</div>
        </div>
        <div className="left">
          <div className="cur">Current Score {score}</div>
          <div className="mx">Score Record {Math.max(maxScore, score)}</div>
        </div>
      </div>
      <div className="dwon">
        {imgs.map(({ id, src, title }) => {
          return (
            <div className="cardelement" key={uuid()}>
              {
                <div className={clicked ==0 ? "inner" : "inner rotation"}>
                  {
                    <div className="front">
                      {
                        <img
                          src={src}
                          alt={title}
                          className="card"
                          onClick={() => {
                            if (vis[id] == 1) {
                              vis = [];
                              setScore(0);
                              setClicked(0);
                            } else {
                              vis[id] = 1;
                              setScore(score + 1);
                              setMaxScore(Math.max(maxScore, score+1));
                            }
                            setClicked(clicked+1)
                          }}
                        />
                      }
                    </div>
                  }
                  {
                    <div className="back">
                      {<img src={oud} alt={title} className="card" />}
                    </div>
                  }
                </div>
              }
            </div>
          );
        })}
      </div>
    </>
  );
}
