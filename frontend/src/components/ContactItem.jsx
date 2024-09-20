import PropTypes from "prop-types";
const ContactItem = ({ icon, title, content }) => (
  <div className="flex items-center space-x-3 mb-4">
    {icon}
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

export default ContactItem;

ContactItem.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
