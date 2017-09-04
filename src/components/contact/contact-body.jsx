import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import Icon from '../partials/icon.jsx';

import SendToForm from '../../helpers/send-to-form.js'

import { profile } from '../../config.js'

export default class ContactBody extends React.PureComponent {
  constructor(props) {
    super(props);

    this.formInputs = {
      name: null,
      email: null,
      message: null,
      captcha: null 
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCaptchaChange = this.onCaptchaChange.bind(this);
    this.setInputReference = this.setInputReference.bind(this);
  }
  
  onFormSubmit(e) {
    e.preventDefault();
    this.formInputs.captcha.execute();
  }

  onCaptchaChange(value) {
    if(value === null) {
      return;
    }

    SendToForm(
      this.formInputs.name.value,
      this.formInputs.email.value,
      this.formInputs.message.value,
      value
    )
  }
  setInputReference(el) {
    this.formInputs[el.id] = el
  } 

  render() {
    const socialIcons = profile.social.map((element, i) => (
      <a href={element.url} key={i} target="_blank">
        <div className="pt-content-card__body__contact__social__item flex flex-full-center"><Icon iconName={element.iconName} />&nbsp;{element.text}</div>
      </a>
    ));

    return (
      <div className="pt-content-card__body pt-content-card__body__contact flex">
        <div className="pt-content-card__body__contact__social flex flex-dc flex-full-center">
          {socialIcons}
        </div>
        <div className="pt-content-card__body__contact__form flex flex-main-center">
          <form className="flex flex-dc flex-full-center" onSubmit={this.onFormSubmit}>
            <div className="pt-content-card__body__contact__form__row flex flex-dc flex-main-center">
              <input id="name" className="pt-content-card__body__contact__form__input" type="text" ref={this.setInputReference}/>
              <label htmlFor="name" className="pt-content-card__body__contact__form__label">What's your name?</label>
              <svg className="line" viewBox="0 0 40 2" preserveAspectRatio="none">
                <path d="M0 1 L40 1" />
                <path d="M0 1 L40 1" className="focus" />
                <path d="M0 1 L40 1" className="error" />
                <path d="M0 1 L40 1" className="valid" />
              </svg>
            </div>
            <div className="pt-content-card__body__contact__form__row flex flex-dc flex-main-center">
              <input id="email" className="pt-content-card__body__contact__form__input" type="email" ref={this.setInputReference}/>
              <label htmlFor="email" className="pt-content-card__body__contact__form__label">What's your email?</label>
              <svg className="line" viewBox="0 0 40 2" preserveAspectRatio="none">
                <path d="M0 1 L40 1" />
                <path d="M0 1 L40 1" className="focus" />
                <path d="M0 1 L40 1" className="error" />
                <path d="M0 1 L40 1" className="valid" />
              </svg>
            </div>
            <div className="pt-content-card__body__contact__form__row flex flex-dc flex-main-center">
              <textarea id="message" className="pt-content-card__body__contact__form__textarea" rows="6" ref={this.setInputReference}/>
              <label htmlFor="message" className="pt-content-card__body__contact__form__label">Please, explain yourself:</label>
              <svg className="line" viewBox="0 0 40 2" preserveAspectRatio="none">
                <path d="M0 1 L40 1" />
                <path d="M0 1 L40 1" className="focus" />
                <path d="M0 1 L40 1" className="error" />
                <path d="M0 1 L40 1" className="valid" />
              </svg>
            </div>

            <div className="pt-content-card__body__contact__form__row flex flex-dc flex-main-center">
              <ReCAPTCHA
                ref={(el) => {this.formInputs.captcha = el}}
                className="recaptcha"
                size="invisible"
                sitekey="6LcBOC8UAAAAAM9YRyBp1RR-1NnwvMU8UDsR63Vu"
                onChange={this.onCaptchaChange}
              />
              <button className="pt-content-card__body__contact__form__send-button flex flex-full-center pointer">Send&nbsp;<Icon iconName="send" /></button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}