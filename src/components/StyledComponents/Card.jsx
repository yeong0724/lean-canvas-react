import styled from 'styled-components';
import styles from './Card.module.css';

/**
 * Styled Components를 사용하면, props를 통해 동적으로 스타일을 변경할 수 있다.
 */
const CardComponent = styled.div`
  border: 2px solid #393939;
  padding: 24px;
  border-radius: 6px;
  background-color: ${({ $primary }) => ($primary ? 'blue' : 'gray')};
`;

function Card() {
  return (
    <>
      <div className={styles['card-container']}>
        <h2>Css Module Component</h2>
        <p>이것은 Css Module로 만든 카드입니다.</p>
      </div>
      <br />
      <CardComponent $primary>
        <h2>Styled Component</h2>
        <p>이것은 styled-components로 만든 카드입니다.</p>
      </CardComponent>
    </>
  );
}

export default Card;
