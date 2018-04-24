'use strict';

import { USERS_CONSTANT } from '../constant/';

export default class User {
  constructor () {
    this._id = null;
    this._email = null;
    this._phone = null;
    this._first_name = null;
    this._last_name = null;
    this._username = null;
    this._type = null;
    this._password = null;
    this._google_id = null;
    this._image_url = null;
    this._link = null;
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

  get phone () {
    return this._phone;
  }

  set phone (value) {
    this._phone = value;
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

  get type () {
    return this._type
  }

  set type (value) {
    this._type = value
  }

  get password () {
    return this._password
  }

  set password (value) {
    this._password = value
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

  get link () {
    return this._link
  }

  set link (value) {
    this._link = value
  }

  get createdAt () {
    return this._createdAt;
  }

  get updatedAt () {
    return this._updatedAt;
  }

  get socialIds () {
    return {
      google_id: this._google_id,
    };
  }

  toJson () {
    return {
      first_name: this._first_name,
      last_name: this._last_name,
      username: this._username,
      email: this._email,
      google_id: this._google_id,
      image_url: this._image_url,
      phone: this._phone,
      password: this._password,
      type: this._type || USERS_CONSTANT.USER,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  toClientJson () {
    return {
      first_name: this._first_name,
      last_name: this._last_name,
      username: this._username,
      email: this._email,
      phone: this._phone,
      google_id: this._google_id,
      image_url: this._image_url,
      type: this._type || USERS_CONSTANT.USER,
      link: this._link,
    };
  }
}
