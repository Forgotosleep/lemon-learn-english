import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const ListeningAnswer = () => {
  const dispatch = useDispatch();
  const { song } = useSelector((state) => state["tasks"]);


  return (
    <div>
      <div>
        <h1>This is the Listening Task Answer Page</h1>
      </div>

      <div>
        <form>


        </form>

      </div>
    </div>
  );
}

export default ListeningAnswer;
