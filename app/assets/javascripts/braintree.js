// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
//

// var braintree = require('braintree-web');


var form = document.querySelector('#cardForm');
// var authorization = 'sandbox_g42y39zw_348pk9cgf3bgyw2b';
var authorization = '<%= @client_token %>';
var submit = document.querySelector("#submit-payment-btn");

braintree.client.create({
  authorization: authorization
}, function(err, clientInstance) {
  if (err) {
    console.error(err);
    return;
  }
  createHostedFields(clientInstance);
});

function createHostedFields(clientInstance) {
  braintree.hostedFields.create({
    client: clientInstance,
    styles: {
      'input': {
        'font-size': '16px',
        'font-family': 'courier, monospace',
        'font-weight': 'lighter',
        'color': '#ccc'
      },
      ':focus': {
        'color': 'black'
      },
      '.valid': {
        'color': '#8bdda8'
      }
    },
    fields: {
      number: {
        selector: '#card-number',
        placeholder: '4111 1111 1111 1111'
      },
      cvv: {
        selector: '#cvv',
        placeholder: '123'
      },
      expirationDate: {
        selector: '#expiration-date',
        placeholder: 'MM/YYYY'
      },
      postalCode: {
        selector: '#postal-code',
        placeholder: '11111'
      }
    }
  }, function (err, hostedFieldsInstance) {
    var teardown = function (event) {
      event.preventDefault();
      alert('Submit your nonce to your server here!');
      hostedFieldsInstance.teardown(function () {
        createHostedFields(clientInstance);
        form.removeEventListener('submit', teardown, false);
      });
    };

    form.addEventListener('submit', teardown, false);
  });
}
