import PropTypes from "prop-types";

export default PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    display_name: PropTypes.string.isRequired,
    base_currency: PropTypes.string.isRequired,
    quote_currency: PropTypes.string.isRequired,
    base_increment: PropTypes.string.isRequired,
    quote_increment: PropTypes.string.isRequired,
    base_min_size: PropTypes.string.isRequired,
    base_max_size: PropTypes.string.isRequired,
    min_market_funds: PropTypes.string.isRequired,
    max_market_funds: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    status_message: PropTypes.string.isRequired,
    cancel_only: PropTypes.bool.isRequired,
    limit_only: PropTypes.bool.isRequired,
    post_only: PropTypes.bool.isRequired,
    trading_disabled: PropTypes.bool.isRequired,
  })
);
