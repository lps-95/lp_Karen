import styled, { css } from 'styled-components'

type BFProps = { $bfActive?: boolean }

export const Section = styled.section<BFProps>`
  width: 100%;
  max-width: 76.5rem;
  margin-inline: auto;
  padding: 4rem 1rem;

  h2 {
    text-transform: uppercase;
    font-size: clamp(2rem, 5vw, 2.5rem);
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.green};
    font-family: 'Stardom', serif;
    letter-spacing: 3px;
    font-weight: bold;
    text-align: center;
  }

  .bf-eyebrow {
    display: block;
    text-align: center;
    margin-bottom: 0.75rem;
    font-size: 12px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #d8be93;
  }

  ${({ $bfActive }) =>
    $bfActive &&
    css`
      h2 {
        color: #ffffff;
        font-weight: 400;
        letter-spacing: 0.06em;
      }
    `}
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  padding: 0.75rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 0.5rem;
  }

  @media (min-width: 641px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const CardWrapper = styled.div<BFProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 400px;
  border-radius: 1.5rem;
  overflow: hidden;
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;
  position: relative;
  background: linear-gradient(180deg, #ffffff 0%, #fbfbfb 100%);
  border: 1px solid rgba(3, 47, 49, 0.08);
  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.06),
    0 2px 10px rgba(15, 23, 42, 0.04);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1.5rem;
    pointer-events: none;
    background: linear-gradient(
      135deg,
      rgba(3, 47, 49, 0.04) 0%,
      transparent 40%,
      rgba(216, 190, 147, 0.06) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 18px 40px rgba(15, 23, 42, 0.1),
      0 6px 20px rgba(15, 23, 42, 0.06);

    &::before {
      opacity: 1;
    }
  }

  ${({ $bfActive }) =>
    $bfActive &&
    css`
      background: #141311;
      border: 1px solid rgba(216, 190, 147, 0.25);
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);

      &::before {
        opacity: 0;
      }

      &:hover {
        transform: translateY(-8px);
        border-color: rgba(216, 190, 147, 0.6);
        box-shadow: 0 26px 52px rgba(0, 0, 0, 0.6);
      }
    `}
`

export const Box = styled.div<BFProps>`
  width: 100%;
  position: relative;
  border-top-right-radius: 1.5rem;
  border-top-left-radius: 1.5rem;
  overflow: hidden;

  @media (min-width: 768px) {
    height: 350px;
  }

  &.disabled {
    pointer-events: none;
    background-color: ${({ theme }) => theme.colors.black};
  }

  .imgBox {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      flex-grow: 1;
      display: block;
      transition:
        transform 0.45s ease,
        filter 0.45s ease;
      filter: brightness(1) contrast(1.02);
    }

    ${CardWrapper}:hover & img {
      transform: scale(1.05);
      filter: brightness(1.03) contrast(1.03);
    }

    img.fit-contain {
      object-fit: contain;
      padding: 1.25rem 1rem 3.75rem;
      background: #f6f6f6;
    }

    ${CardWrapper}:hover & img.fit-contain {
      transform: scale(1.02);
    }

    ${({ $bfActive }) =>
      $bfActive &&
      css`
        background: linear-gradient(180deg, #f8f3eb 0%, #fdfbf7 100%);

        ${CardWrapper}:hover & img {
          transform: scale(1.06);
          filter: brightness(1.04) contrast(1.04) saturate(1.02);
        }

        .discount-tag.discount-tag {
          padding: 0.45rem 0.85rem;
          background: #0a0a0a;
          color: #f3e3c3;
          border: 1px solid rgba(216, 190, 147, 0.6);
          font-family: 'LeagueGothic', sans-serif;
          font-size: 1.5rem;
          font-weight: 400;
          line-height: 1;
          letter-spacing: 0.04em;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
        }

        .icon.icon {
          background: #0a0a0a;
          border-top: 1px solid rgba(216, 190, 147, 0.45);

          &.outOfStock {
            background: none;
            border-top: 0;
          }

          .iconBox {
            color: #f3e3c3;
          }
        }
      `}

    &.outOfStock img {
      filter: grayscale(1) brightness(0.9);
    }

    ${CardWrapper}:hover &.outOfStock img {
      transform: none;
      filter: grayscale(1) brightness(0.9);
    }

    .outOfStockText {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(10, 10, 10, 0.5);

      span {
        padding: 0.6rem 1.4rem;
        border-radius: 999px;
        border: 1px solid #d8be93;
        background: #0a0a0a;
        color: #f3e3c3;
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.3em;
        text-transform: uppercase;
      }
    }

    .discount-tag {
      position: absolute;
      top: 14px;
      left: 14px;
      padding: 0.5rem 0.85rem;
      font-size: 0.76rem;
      border-radius: 999px;
      z-index: 2;
      backdrop-filter: blur(8px);
      transition:
        transform 0.25s ease,
        box-shadow 0.25s ease;
      box-shadow: 0 10px 24px rgba(3, 47, 49, 0.1);
      background: rgba(245, 241, 232, 0.92);
      color: #032f31;
      border: 1px solid rgba(216, 190, 147, 0.75);
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .icon {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3rem;
      background: ${({ theme }) => theme.colors.green};
      display: flex;
      justify-content: center;
      align-items: center;

      &.outOfStock {
        background: none;
      }

      .iconBox {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: ${({ theme }) => theme.colors.white};
        background: none;
        border: none;
        font-size: clamp(0.875rem, 5vw, 1rem);
        font-family: 'Melodrama', sans-serif;
        letter-spacing: 2px;
        white-space: nowrap;

        &:hover {
          transform: scale(1.05);
          cursor: pointer;
        }
      }
    }
  }
`

export const Title = styled.h3<BFProps>`
  font-size: clamp(0.95rem, 4vw, 1.2rem);
  color: ${({ theme }) => theme.colors.green};
  font-family: 'Melodrama', serif;
  font-weight: 700;
  letter-spacing: 0.4px;
  padding: 14px 12px;
  text-align: center;
  min-height: 4rem;
  border-top: 1px solid rgba(3, 47, 49, 0.06);
  border-bottom: 1px solid rgba(3, 47, 49, 0.06);
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);

  ${({ $bfActive }) =>
    $bfActive &&
    css`
      border-top: 1px solid rgba(216, 190, 147, 0.2);
      border-bottom: 1px solid rgba(216, 190, 147, 0.2);
      background: #141311;
      color: #ffffff;
    `}
`

export const CardContent = styled.div<BFProps>`
  padding: 1rem 0.9rem 1.1rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.green} 0%,
    ${({ theme }) => theme.colors.brunswickGreen} 100%
  );
  border-bottom-right-radius: 1.25rem;
  border-bottom-left-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 6rem;
  position: relative;

  ${({ $bfActive }) =>
    $bfActive &&
    css`
      background: #141311;

      .campaign-pill.campaign-pill {
        color: #0a0a0a;
        background: #d8be93;
        border-color: #d8be93;
        font-weight: 700;
      }

      .price-from.price-from {
        color: #a8a196;

        span {
          color: #a8a196;
        }
      }

      .price-now.price-now {
        font-family: 'LeagueGothic', sans-serif;
        font-weight: 400;
        font-size: 2.75rem;
        letter-spacing: 0.01em;
        background: linear-gradient(180deg, #fbefd6 0%, #e2c690 45%, #b48f55 75%, #e8cf9c 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    `}

  .campaign-pill {
    margin-bottom: 0.75rem;
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 0.25rem 0.75rem;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #d8be93;
    border: 1px solid rgba(216, 190, 147, 0.35);
    background: rgba(3, 47, 49, 0.18);
  }

  .price-from {
    margin-bottom: 0.25rem;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.62);

    span {
      text-decoration: line-through;
      color: rgba(255, 255, 255, 0.48);
    }
  }

  .price-now {
    font-weight: 800;
    font-size: 1.9rem;
    line-height: 1.1;
    color: #f5f1e8;
    letter-spacing: -0.03em;
  }

  .price-save {
    margin-top: 0.5rem;
    font-size: 0.82rem;
    color: #d8be93;
    letter-spacing: 0.04em;
  }

  .price-default {
    font-weight: 700;
    font-size: 1.7rem;
    color: #fff;
    letter-spacing: -0.02em;
  }

  .unavailable-price {
    color: rgba(255, 255, 255, 0.45);
    text-decoration: line-through;
    font-size: 1.4rem;
  }

  .unavailable {
    margin-top: 0.35rem;
    color: #d8be93;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
`

export const CheckoutButton = styled.button`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.green};
  color: white;
  font-weight: bold;
  padding: 0.5rem 2rem;
  font-size: 1rem;
  border-radius: 3.125rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 9.375rem;
  max-width: 80%;
  overflow: hidden;
  z-index: 99;
  border: 0;
  cursor: pointer;
`
