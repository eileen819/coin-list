import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Iprops } from "../interface";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

const Container = styled.div<{ $isDark: boolean }>`
  padding: 20px;
  border-radius: 15px;
  background-color: ${(props) =>
    props.$isDark ? "rgba(0, 0, 0, 0.5)" : "white"};
`;
const Title = styled.div`
  margin-bottom: 10px;
`;
const PriceAtNow = styled.div`
  font-size: 12px;
  margin-bottom: 20px;
  line-height: 1.2;
  span {
    color: ${(props) => props.theme.accentColor};
    font-size: 14px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 30px;
`;
const Wrapper = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Label = styled.label`
  margin-right: 10px;
  width: 50px;
`;
const Input = styled.input`
  width: 300px;
  height: 25px;
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
  &:focus {
    border-bottom: 1px solid ${(props) => props.theme.accentColor};
  }
`;
const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;
const Button = styled.button<{ $isDark: boolean }>`
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 15px;
  outline: none;
  padding: 5px 10px;
  color: ${(props) =>
    props.$isDark ? props.theme.bgColor : props.theme.textColor};
  cursor: pointer;
`;

function Converter({ coinName, coinPrice }: Iprops) {
  const isDark = useRecoilValue(isDarkAtom);
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const coinInputRef = useRef<HTMLInputElement>(null);
  const usdInputRef = useRef<HTMLInputElement>(null);
  const nowTime = new Date().toUTCString();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const onReset = () => {
    setValue("");
    if (disabled) {
      usdInputRef.current?.focus();
    } else {
      coinInputRef.current?.focus();
    }
  };

  const onInvert = () => {
    setValue("");
    setDisabled((prev) => !prev);
  };

  useEffect(() => {
    if (disabled) {
      usdInputRef.current?.focus();
    } else {
      coinInputRef.current?.focus();
    }
  }, [disabled]);

  const coinAmount =
    value && coinPrice ? (parseFloat(value) / coinPrice).toFixed(6) : "";
  const usdAmount =
    value && coinPrice ? (parseFloat(value) * coinPrice).toFixed(2) : "";

  return (
    <Container $isDark={isDark}>
      <Title>Coin Coverter</Title>
      <PriceAtNow>
        Now {coinName} price is{" "}
        <span>US $ {parseFloat(coinPrice.toFixed(2)).toLocaleString()}</span>.{" "}
        <br />
        This price is based on {nowTime}
      </PriceAtNow>
      <InputWrapper>
        <Wrapper>
          <Label htmlFor={coinName}>{coinName}</Label>
          <Input
            ref={coinInputRef}
            value={disabled ? coinAmount : value}
            onChange={onChange}
            id={coinName}
            type="number"
            placeholder={coinName}
            required
            disabled={disabled}
          />
        </Wrapper>
        <Wrapper>
          <Label htmlFor="usd">USD</Label>
          <Input
            ref={usdInputRef}
            value={disabled ? value : usdAmount}
            onChange={onChange}
            id="usd"
            type="number"
            placeholder="USD"
            required
            disabled={!disabled}
          />
        </Wrapper>
      </InputWrapper>
      <BtnWrapper>
        <Button $isDark={isDark} onClick={onReset}>
          Reset
        </Button>
        <Button $isDark={isDark} onClick={onInvert}>
          Invert
        </Button>
      </BtnWrapper>
    </Container>
  );
}

export default Converter;
