import PropTypes from "prop-types";

export default PropTypes.objectOf(
  PropTypes.shape({
    type: PropTypes.string.isRequired,
    trade_id: PropTypes.number.isRequired,
    sequence: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    product_id: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    side: PropTypes.string.isRequired,
    last_size: PropTypes.string.isRequired,
    best_bid: PropTypes.string.isRequired,
    best_ask: PropTypes.string.isRequired,
  })
);
