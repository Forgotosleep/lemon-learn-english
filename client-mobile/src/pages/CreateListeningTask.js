import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const CreateListeningTask = () => {
  const dispatch = useDispatch();
  const { song } = useSelector((state) => state["tasks"]);

  return (
    <div>
      <div>
        <h1>This is the Listening Task Creation Page</h1>
      </div>

      <div>


      </div>
    </div>
  );
}

export default CreateListeningTask;
