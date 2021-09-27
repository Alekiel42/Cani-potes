/* eslint-disable linebreak-style */
// required les champs

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

// action creator
import { nextSignupFormStep } from '../../../actions/signup';

import './user-form.scss';

const UserForm = () => {
  const {
    register, handleSubmit, formState: { isSubmitSuccessful, errors }, watch,
  } = useForm();
  const onSubmit = (data) => {
    console.log('data', data);
  };

  const formStep = useSelector((state) => state.signup.formStep);

  const dispatch = useDispatch();
  const clickToContinue = () => {
    // if (isSubmitSuccessful) {
    console.log('yes');
    dispatch(nextSignupFormStep());
    // }
  };

  if (isSubmitSuccessful) {
    console.log('yes');
    clickToContinue();
  }

  return (
    <div className={formStep === 1 ? 'signup user-form' : 'hidden'}>
      <h2 className="signup__subtitle">Vous</h2>

      <div className="user-form__form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* {isValid ? <p> isValid 'true'</p> : <p> isValid 'false'</p>}
          {isSubmitted ? <p> isSubmitted 'true'</p> : <p> isSubmitted 'false'</p>}
          {isSubmitting ? <p> isSubmitting 'true'</p> : <p> isSubmitting 'false'</p>}
          {isSubmitSuccessful ? <p> isSubmitSuccessful 'true'</p> : <p> isSubmitSuccessful 'false'</p>} */}

          <div className="user-form__form__input-infos">
            <div className="user-form__form__input-infos__identity">
              {/* Firstname */}
              <div className="user-form__form__input-infos__first_name">
                <input {...register('first_name', { required: 'Veuillez entrer votre prénom.' })} type="text" placeholder="Prénom" defaultValue="ma" />
                {errors.first_name && <p className="errors">{errors.first_name.message}</p>}
              </div>

              {/* Name */}
              <div className="user-form__form__input-infos__name">
                <input {...register('last_name', { required: 'Veuillez entrer votre nom.' })} type="text" placeholder="Nom" defaultValue="ch" />
                {errors.last_name && <p className="errors">{errors.last_name.message}</p>}
              </div>

              {/* Email */}
              <div className="user-form__form__input-infos__email">
                <input {...register('email', { required: 'Veuillez entrer un email.' })} type="email" placeholder="Email" defaultValue="az@z" />
                {errors.email && <p className="errors">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="user-form__form__input-infos__password">
                <input {...register('password', { required: 'Veuillez entrer un mot de passe.' })} type="password" placeholder="Mot de passe" />
                {errors.password && <p className="errors">{errors.password.message}</p>}
              </div>

              {/* Password confirmation */}
              <div className="user-form__form__input-infos__password--confirmation">
                <input {...register('password_confirmation', { required: 'Veuillez confirmer votre mot de passe.', validate: (value) => value === watch('password') || 'Les mots de passe de correspondent pas' })} type="password" placeholder="Confirmer mot de passe" />
                {errors.password_confirmation && <p className="errors">{errors.password_confirmation.message}</p>}
              </div>

              {/* Picture profile */}
              <div className="user-form__form__input-infos__picture">
                <label htmlFor="photo">Ajouter une photo de profil
                  <input
                    {...register(('photo'))}
                    type="file"
                    id="photo"
                    accept="image/png, image/jpeg"
                  />
                </label>
              </div>
            </div>

            {/* Zipcode */}
            <div className="user-form__form__input-infos__zipcode">
              <p className="user-form__form__input-infos__zipcode__p">
                Afin de pouvoir géolocaliser votre ville,
                nous avons besoin de votre code postal.
              </p>
              <div className="user-form__form__input-infos__zipcode__input">
                <input {...register('zip_code', { required: 'Veuillez entrer un code postal.', minLength: { value: 5, message: 'Veuillez entrer un code postal à 5 chiffres.' }, maxLength: { value: 5, message: 'Veuillez entrer un code postal à 5 chiffres.' } })} type="text" placeholder="Code postal" />
                {errors.zip_code && <p className="errors">{errors.zip_code.message}</p>}
                {}
              </div>
            </div>
          </div>
          <div className="signup__back-submit">
            <Link to="/" className="signup__back-submit__back">Retour</Link>
            <button
              // onClick={clickToContinue}
              type="submit"
              className="signup__back-submit__submit"
            >Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
