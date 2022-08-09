import React, { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { View } from "../View/View";
import PropTypes from "prop-types";

type Props = {
  selectedIndex: number;
  options: any;
  onChange: any;
  width: any;
  title?: string;
};

const Tab = ({
  selectedIndex,
  options,
  onChange,
  width,
  title,
  ...rest
}: Props) => {
  const [selectedTab, setSelectedTab] = useState(selectedIndex);

  useEffect(() => {
    setSelectedTab(selectedIndex);
  }, [selectedIndex]);

  const handelOnClick = (e: any, index: number) => {
    setSelectedTab(index);
    onChange && onChange(index);
  };

  const renderButtons = () => {
    return options.map((option: any, index: number) => {
      return (
        <Button
          onClick={(e) => {
            handelOnClick(e, index);
          }}
          key={index}
          buttonStyle={{
            margin: "2px",
          }}
          active={selectedTab === index}
          data-testid={option.label}
        >
          {option.label}
        </Button>
      );
    });
  };

  return (
    <View key={selectedIndex} title={title} direction="flex-col">
      <View key={selectedIndex} direction="flex-row" justifyItems="center">
        {renderButtons()}
      </View>
      {options.map(
        (option: any, index: any) =>
          selectedTab === index && (
            <View direction="flex-col">{option.content}</View>
          )
      )}
    </View>
  );
};

Tab.propTypes = {
  options: PropTypes.any,
  selectedIndex: PropTypes.number,
  width: PropTypes.string,
  onChange: PropTypes.func,
};

Tab.defaultProps = {
  options: [],
  selectedIndex: 0,
  width: "100%",
};

export { Tab };
