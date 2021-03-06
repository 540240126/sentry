import PropTypes from 'prop-types';
import React from 'react';
import ReactCodeInput from 'react-code-input';
import Modal from 'react-bootstrap/lib/Modal';
import {t} from '../../locale';

class NumberConfirm extends React.Component {
  static propTypes = {
    digits: PropTypes.number.isRequired,
    show: PropTypes.bool,
    onFinished: PropTypes.func,
  };

  state = {
    showModal: this.props.show || false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.show != this.props.show) {
      this.setState({
        showModal: nextProps.show,
      });
    }
  }

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  onChange = number => {
    if (number === undefined && !Number.isInteger(number)) {
      return;
    }
    if (number.length === this.props.digits) {
      if (this.props.onFinished) {
        this.props.onFinished(number);
      }
      this.closeModal();
    }
  };

  render() {
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.closeModal}
        animation={true}
        backdrop="static"
        enforceFocus={true}
        bsSize="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('Please enter your code:')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactCodeInput
            type="number"
            digits={this.props.digits}
            onChange={this.onChange}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default NumberConfirm;
