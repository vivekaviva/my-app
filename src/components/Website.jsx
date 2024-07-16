function website(props) {
  const { webInfo } = props;
  const { page, number, content } = webInfo;
  const text = `Hi, ${page} with the page number ${number} ${content}`;
  return <h2>{text}</h2>;
}

export default website;
