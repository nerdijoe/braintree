class BraintreeController < ApplicationController
  def new
    @client_token = Braintree::ClientToken.generate
  end
end
