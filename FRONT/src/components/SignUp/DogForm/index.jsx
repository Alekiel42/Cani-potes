/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React from 'react';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import './dog-form.scss';

const DogForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const isFormComplete = useSelector((state) => state.isMyDogFormComplete);

  return (
    <div className="signup dog">
      <div className={isFormComplete ? 'part-bullet part-bullet_complete' : 'part-bullet'}>{isFormComplete ? '✓' : ''}</div>
      <h2 className={isFormComplete ? 'title-valid' : ''}>Mon chien</h2>
      {/* div pour display hidden */}
      <div className={isFormComplete ? 'signup-hide' : ''}>
        <form onSubmit={handleSubmit(onSubmit)} className="dog__form"> {/* className pas raccord, à modif */}
          <div className="dog__input-infos">
            <div className="dog__input-infos__first">
              {/* Race */}
              <select {...register('races')} id="races-select" className="dog__commun">
                <option value="">Race</option>
                <option value="test1">test1</option>
                <option value="test2">test2</option>
              </select>
              {/* Age */}
              <input {...register('age')} type="number" placeholder="Age" className="dog__commun" />
              {/* Poids */}
              <input {...register('poids')} type="number" placeholder="Poids (kg)" className="dog__commun" />
            </div>
            <div className="dog__input-infos__others">

              {/* Sexe */}
              <div className="dog__input-infos__others__sexe">
                <p className="dog__input-infos__others__title">Il s'agit d'un(e)</p>
                {/* Femelle */}
                <input {...register('sexe')} type="radio" id="femelle" value="femelle" checked />
                <label htmlFor="femelle" className="dog__commun">Femelle</label>
                {/* Mâle */}
                <input {...register('sexe')} type="radio" id="male" value="male" />
                <label htmlFor="male" className="dog__commun">Mâle</label>
              </div>

              {/* Stérilisé */}
              <div className="dog__input-infos__others__sterilized">
                <p className="dog__input-infos__others__title">Il est stérilisé</p>
                <input {...register('sterilized')} type="radio" id="sterilized-yes" value="sterilized-yes" />
                <label htmlFor="sterilized-yes" className="dog__commun">Oui</label>
                <input {...register('sterilized')} type="radio" id="sterilized-no" value="sterilized-no" checked />
                <label htmlFor="sterilized-no" className="dog__commun">Non</label>
              </div>

              {/* Caractère */}
              <div className="dog__input-infos__others__character">
                <div><p className="dog__input-infos__others__title">Il est plutôt du genre</p></div>
                <div className="dog__input-infos__others__character__label-flex">
                  <input {...register('character')} type="radio" id="sociable" value="sociable" />
                  <label htmlFor="sociable" className="dog__commun">Sociable</label>

                  <input {...register('character')} type="radio" id="joueur" value="joueur" />
                  <label htmlFor="joueur" className="dog__commun">Joueur</label>

                  <input {...register('character')} type="radio" id="peureux" value="peureux" />
                  <label htmlFor="peureux" className="dog__commun">Peureux</label>

                  <input {...register('character')} type="radio" id="agressif" value="agressif" />
                  <label htmlFor="agressif" className="dog__commun">Agressif</label>
                </div>
              </div>

              {/* Nom */}
              <div className="dog__input-infos__others__name">
                <label htmlFor="name">Il s'appelle</label>
                <input {...register('name')} type="text" id="name" placeholder="Nom" />
              </div>
            </div>
            <div className="signup__input-infos__picture">
              <p>Ajouter une photo de votre chien</p>
            </div>
          </div>
          <button type="button" className="dog__input-infos__add-dog">Ajouter un chien</button>
          <button type="submit" className="dog__input-infos__back">Retour</button>
          <button type="submit" className="dog__input-infos__submit">Continuer</button>
        </form>
      </div>
    </div>
  );
};
export default DogForm;