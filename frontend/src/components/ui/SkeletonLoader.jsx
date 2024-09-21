import { Skeleton, Tr, Td } from "@chakra-ui/react";
import PropTypes from "prop-types";

const SkeletonLoader = ({ columns = 5, rows = 5 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Tr key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Td key={colIndex}>
              <Skeleton height="20px" />
            </Td>
          ))}
        </Tr>
      ))}
    </>
  );
};

export default SkeletonLoader;

SkeletonLoader.propTypes = {
    columns: PropTypes.number,
    rows: PropTypes.number,
    };
