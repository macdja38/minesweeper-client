import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import { loader, centered } from './index.module.css';
import { createGame } from '../../services/api/game';

export default function Loading() {
  const { history } = useReactRouter();


  useEffect(() => {
    createGame().then((game) => {
      history.push(`/game/${game.id}`);
    });
  }, []);

  return (
    <div className={centered}>
      <div className={loader} />
    </div>
  );
}
