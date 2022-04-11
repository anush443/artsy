import styled from "styled-components";

const Card = styled.div`
  margin: 30px auto;
  width: 300px;
  height: 300px;
  border-radius: 40px;
  box-shadow: 5px 5px 30px 7px rgba(0, 0, 0, 0.25),
    -5px -5px 30px 7px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    transform: scale(0.9, 0.9);
    box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
      -5px -5px 30px 15px rgba(0, 0, 0, 0.22);
  }
`;

const CardImage = styled.div`
  width: inherit;
  height: inherit;
  border-radius: 40px;
`;
const Image = styled.img`
  width: inherit;
  height: inherit;
  border-radius: 40px;
  object-fit: cover;
`;
const Info = styled.div`
  text-align: center;
  border-radius: 0px 0px 40px 40px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 30px;
  margin-top: -80px;
  height: 40px;
`;
const Title = styled.p`
  color: white;
  margin-bottom: 20px;
`;

const CategoryItem = ({ item }) => {
  return (
    <>
      <Card>
        <CardImage>
          <Image src={item.img} key={item.id} />
        </CardImage>
        <Info>
          <Title>{item.title}</Title>
        </Info>
      </Card>
    </>
  );
};

export default CategoryItem;
