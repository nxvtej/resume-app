/* eslint-disable react/prop-types */

function SummaryPreview({ resumeInfo }) {
	return <p className='text-xs'>{resumeInfo?.summary}</p>;
}

export default SummaryPreview;
