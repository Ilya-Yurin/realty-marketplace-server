'use strict';

export default class User {
  constructor () {
    this._id = null;
    this._email = null;
    this._first_name = null;
    this._last_name = null;
    this._username = null;
    this._type = null;
    this._password = null;
    this._google_id = null;
    this._image_url = null;
    this._createdAt = null;
    this._updatedAt = null;
  }

  get id () {
    return this._id;
  }

  get email () {
    return this._email;
  }

  set email (value) {
    this._email = value;
  }

  get firstName () {
    return this._first_name;
  }

  set firstName (value) {
    this._first_name = value;
  }

  get lastName () {
    return this._last_name;
  }

  set lastName (value) {
    this._last_name = value;
  }

  get username () {
    return this._username;
  }

  set username (value) {
    this._username = value;
  }

  get googleId () {
    return this._google_id;
  }

  set googleId (value) {
    this._google_id = value;
  }

  get imageUrl () {
    return this._image_url;
  }

  set imageUrl (value) {
    this._image_url = value;
  }

  get createdAt () {
    return this._createdAt;
  }

  get updatedAt () {
    return this._updatedAt;
  }

  toJson () {
    return {
      first_name: this._first_name,
      last_name: this._last_name,
      username: this._username,
      email: this._email,
      google_id: this._google_id,
      image_url: this._image_url,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}