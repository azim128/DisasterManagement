import PropTypes from "prop-types";

const FeatureItem = ({ icon, title, description }) => (
  <div className="flex items-start space-x-3 mb-6">
    {icon}
    <div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default FeatureItem;

//   add props validation

FeatureItem.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
