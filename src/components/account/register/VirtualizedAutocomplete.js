import * as React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import Popper from "@mui/material/Popper";
import { useTheme, styled } from "@mui/material/styles";
import { VariableSizeList } from "react-window";
import Typography from "@mui/material/Typography";

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  return (
    <div
      {...dataSet[0]}
      style={{
        ...inlineStyle,
        display: "flex",
        gap: "0.5em",
        justifyContent: "space-between",
      }}
    >
      <Typography>{dataSet[1].nome}</Typography>
      <Typography style={{ fontWeight: "bold", textAlign: "right" }}>{dataSet[1].provincia.nome}</Typography>
    </div>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = [];
  children.forEach((item) => {
    itemData.push(item);
    itemData.push(...(item.children || []));
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = 48;

  const getChildSize = (child) => {
    if (child.hasOwnProperty("group")) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

const VirtualizedAutocomplete = ({ label, comuni, placeOfBirth, setPlaceOfBirth, selectedComune, setSelectedComune, setProvinceOfBirth, setCap }) => {
  return (
    <Autocomplete
      freeSolo
      disableListWrap
      value={selectedComune}
      inputValue={placeOfBirth ? placeOfBirth : ""}
      onInputChange={(_, newInput) => setPlaceOfBirth(newInput)}
      onChange={(_, comune) => {
        if (!comune) {
          return;
        }

        if (typeof comune === "string") {
          setPlaceOfBirth(comune);

          return;
        }
        setSelectedComune(comune);
        setPlaceOfBirth(comune.nome);
        setProvinceOfBirth(comune.provincia.nome);
        setCap ? setCap(comune.cap) : {};
      }}
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={comuni}
      renderInput={(params) => <TextField {...params} label={label} />}
      renderOption={(props, option, state) => [props, option, state.index]}
      // TODO: Post React 18 update - validate this conversion, look like a hidden bug
      getOptionLabel={(comune) => (typeof comune === "string" ? comune : comune.nome)}
    />
  );
};

export default VirtualizedAutocomplete;
