/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneUserById, getProfileIsLoading } from '../../actions/users';
import { getDogBreedsAndBehaviors } from '../../actions/signup';

import './profile.scss';

import race from '../../assets/img/profile-simulation/race.svg';
import sociable from '../../assets/img/profile-simulation/sociable.svg';

const Profile = () => {
  const { user, profile, signup } = useSelector((state) => state);
  const dispatch = useDispatch();
  const profileIsUser = user.id === profile.id;

  const { id } = useParams();

  useEffect(() => {
    // wait for db to send profile before uncomment here
    // dispatch(getProfileIsLoading());
    dispatch(getOneUserById(id));
    dispatch(getDogBreedsAndBehaviors());
  }, []);

  // manage to edit user
  const [isEditingUser, setisEditingUser] = useState(false);
  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [zipcode, setZipcode] = useState(profile.zipcode);
  const [photoUser, setPhotoUser] = useState();

  // manage to edit dog
  const [isEditingDog, setisEditingDog] = useState(false);
  const [surname, setSurname] = useState();
  const [behavior, setBehavior] = useState();
  const [breed, setBreed] = useState();
  const [gender, setGender] = useState();
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  const [sterilization, setSterilization] = useState();
  const [description, setDescription] = useState();

  // lorsque je clique sur modif un dog
  // je veux voir les input et leur valeurs sont
    // trouver le chien grâce à son id dans le state
    // à la modif d'un champ je setInfo 

  const toggleEditUser = () => {
    setisEditingUser(!isEditingUser);
  };

  const toggleEditDog = (index) => {
    if (isEditingDog === index + 1) setisEditingDog(0);
    else {
      setisEditingDog(index + 1);
      const editingDog = profile.dogs.find((dog, i) => i === index);

      // set default value of input by data from state
      setSurname(editingDog.dog_surname);
      setBreed(signup.breeds.find(
        (currentBreed) => currentBreed.label === editingDog.dog_breed,
      ).id);
      setBehavior(signup.behaviors.find(
        (currentBehavior) => currentBehavior.label === editingDog.dog_behavior,
      ).id);
      setGender(editingDog.dog_gender === 'femelle' ? 1 : 2);
      setWeight(editingDog.dog_weight);
      setSterilization(editingDog.dog_sterilization);
      setDescription(editingDog.dog_description);
    }
  };

  const handleUpdateUser = () => {
    console.log('update user in db');
    setisEditingUser(false);
  };

  const handleUpdateDog = (e) => {
    e.preventDefault();
    console.log(e);
  };

  // todo check with profilereducer about data 
  // todo add form for update user and form for each dog (easier for db)

  return (
    <div className="profile-page">
      {
        profile.isLoading ? (
          <span>chargement ...</span>
        ) : (
          <>
            {
              profileIsUser && (
                <div
                  className="profile-page__edit"
                  onClick={toggleEditUser}
                >
                  {isEditingUser ? 'Retour' : 'Modifier'}
                </div>
              )
            }

            <header className="profile-page__header">
              <div>
                <span className="profile-page__header__annoucement">
                  {profileIsUser ? 'Votre profil ' : 'Profil de '}
                </span>
                <div className="profile-page__header__avatar">
                  <img src={profile.photo} alt={profile.first_name} />
                  {
                    isEditingUser && (
                      <input
                        type="file"
                        onChange={(e) => {
                          setPhotoUser(e.target.value);
                          console.log(e);
                        }}
                      />
                    )
                  }
                </div>
                <span className="profile-page__header__avatar-name">{profile.first_name}</span>
              </div>
            </header>

            <section className="profile-page__info-user">
              <h2>Informations sur l'utilisateur</h2>
              <p className="profile-page__info-user__content">
                <span className="profile-page__info-user__content-field">
                  {
                    isEditingUser ? (
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    ) : (
                      <span>{profile.first_name}</span>
                    )
                  }
                  {
                    isEditingUser ? (
                      <input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                      />
                    ) : (
                      <span>{profile.last_name}</span>
                    )
                  }
                </span>
                <span className="profile-page__info-user__content-field">
                  {
                    isEditingUser ? (
                      <input
                        type="number"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                      />
                    ) : (
                      <span>Ville : {profile.zipcode}</span>
                    )
                  }
                </span>
                <span className="profile-page__info-user__content-field">
                  <span>Nombre de chien{profile.dogs.length > 1 && 's'} : {profile.dogs.length}</span>
                </span>
              </p>
              {isEditingUser && (
                <div className="profile-page__info-user__submit">
                  <button
                    type="button"
                    onClick={handleUpdateUser}
                  >
                    Enregistrer vos infos
                  </button>
                </div>
              )}
            </section>

            <section className="profile-page__info-dogs">
              {
                profile.dogs.map((dog, index) => (
                  <form onSubmit={handleUpdateDog}>
                    <h2>
                      #{index + 1} Carte de {dog.dog_surname}
                      {
                        profileIsUser && (
                          <div
                            className="profile-page__edit__dog"
                            onClick={() => toggleEditDog(index)}
                          >
                            {isEditingDog === index + 1 ? 'Retour' : 'Modifier'}
                          </div>
                        )
                      }
                    </h2>
                    <div className="profile-page__dog">
                      <div className="profile-page__dog__details">
                        {/* SURNAME GENDER BIRTHDAY */}
                        {isEditingDog === index + 1 ? (
                          <div className="profile-page__dog__display-input">
                            <input
                              type="text"
                              value={surname}
                              onChange={(e) => setSurname(e.target.value)}
                            />
                            <span className="profile-page__dog__gender-container">
                              <label htmlFor="femelle">
                                Femelle
                                <input
                                  id="femelle"
                                  type="radio"
                                  name="gender"
                                  value={1}
                                  checked={gender === 1}
                                  onChange={() => setGender(1)}
                                />
                              </label>
                              <label htmlFor="male">
                                Mâle
                                <input
                                  id="male"
                                  type="radio"
                                  name="gender"
                                  value={2}
                                  checked={gender === 2}
                                  onChange={() => setGender(2)}
                                />
                              </label>
                            </span>
                            <label htmlFor="birthday">
                              Naissance
                              <input
                                type="date"
                                name="birthday"
                                onChange={(e) => setAge(e.target.value)}
                              />
                            </label>
                          </div>
                        ) : (
                          <span>
                            {dog.dog_surname} {dog.dog_gender === 'male' ? '♂' : '♀'} {dog.dog_age}
                          </span>
                        )}

                        {/* BREED */}
                        {isEditingDog === index + 1 ? (
                          <select
                            name="breed"
                            onChange={(e) => setBreed(e.target.value)}
                            defaultValue={breed}
                          >
                            {signup.breeds.map((currentBreed) => (
                              <option
                                value={currentBreed.id}
                              >
                                {currentBreed.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span>
                            <img src={race} alt="race" />
                            {dog.dog_breed}
                          </span>
                        )}

                        {/* BEHAVIOR STERILIZATION */}
                        <div className="profile-page__dog__details-behavior">
                          {isEditingDog === index + 1 ? (
                            <>
                              <select
                                name="behavior"
                                onChange={(e) => setBehavior(e.target.value)}
                                defaultValue={behavior}
                              >
                                {signup.behaviors.map((currentBehavior) => (
                                  <option
                                    value={currentBehavior.id}
                                  >
                                    {currentBehavior.label}
                                  </option>
                                ))}
                              </select>
                              <label htmlFor="sterilization">
                                <input
                                  type="checkbox"
                                  name="sterilization"
                                  id="sterilization"
                                  checked={sterilization}
                                />
                                Stérilisé
                              </label>
                            </>
                          ) : (
                            <>
                              <span>
                                <img src={sociable} alt="comportement" />
                                {dog.dog_behavior}
                              </span>
                              {dog.dog_sterilization ? 'Stérilisé' : 'Non stérilisé'}
                            </>
                          )}
                        </div>

                        {/* DESCRIPTION */}

                        {isEditingDog === index + 1 ? (
                          <textarea
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                          >
                            {description}
                          </textarea>
                        ) : (
                          <div>{dog.dog_description}</div>
                        )}
                      </div>
                    </div>

                    <div className="profile-page__dog-pictures">
                      <h2>Photos de {dog.dog_surname}</h2>
                      <div className="profile-page__dog-pictures__container">
                        {
                          dog.dog_photo.map((photo) => (
                            <div className="profile-page__dog-pictures__container-item" key={photo.photo_id}>
                              <img src={photo.photo_url} alt={dog.dog_surname} />
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </form>
                ))
              }
            </section>
          </>
        )
      }
    </div>
  );
};

export default Profile;
