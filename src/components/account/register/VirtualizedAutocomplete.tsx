import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import { VariableSizeList } from "react-window";
import Typography from "@mui/material/Typography";
import {
  AutocompleteSelected,
  Comune,
  Focus,
} from "src/components/CommonTypesInterfaces";
import { RefProp } from "react-spring";

const LISTBOX_PADDING = 8; // px

type renderRowData = [object, Comune, number];

type renderRowType = {
  data: renderRowData[];
  index: number;
  style: React.CSSProperties;
};

const renderRow = ({ data, index, style }: renderRowType) => {
  const dataSet = data[index];

  const inlineStyle = {
    ...style,
    top: style.top ? Number(style.top) + LISTBOX_PADDING : 0,
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
      <Typography style={{ fontWeight: "bold", textAlign: "right" }}>
        {dataSet[1].provincia.nome}
      </Typography>
    </div>
  );
};

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

// function useResetCache(data: number) {
//   const ref = React.createRef<null>();

//   React.useEffect(() => {
//     if (ref.current != null) {
//       ref.current.resetAfterIndex(0, true);
//     }
//   }, [data]);
//   return ref;
// }

type ListboxComponentProps = {
  children?: any;
  other?: object;
};

// Adapter for react-window
const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other }: ListboxComponentProps = props;

  // Unused
  // const theme = useTheme();
  // const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
  //   noSsr: true,
  // });
  const itemCount = children.length;
  const itemSize = 48;

  const getChildSize = (child: renderRowData) => {
    if (child.hasOwnProperty("group")) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return children
      .map(getChildSize)
      .reduce((a: number, b: number) => a + b, 0);
  };

  // const gridRef = useResetCache(itemCount);
  const gridRef = React.createRef<VariableSizeList>();

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={children}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(children[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

// This fixes a Warning... probably not a good idea to ignore this?
// ListboxComponent.propTypes = {
//   children: PropTypes.node,
// };

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

type VirtualizedAutocompleteTypes = {
  label: string;
  comuni: Comune[];
  placeOfBirth: string;
  setPlaceOfBirth: React.Dispatch<React.SetStateAction<string>>;
  selectedComune: AutocompleteSelected;
  setSelectedComune: React.Dispatch<React.SetStateAction<AutocompleteSelected>>;
  setProvinceOfBirth: React.Dispatch<React.SetStateAction<string>>;
  setCap: React.Dispatch<React.SetStateAction<string>> | null;
};

const VirtualizedAutocomplete = ({
  label,
  comuni,
  placeOfBirth,
  setPlaceOfBirth,
  selectedComune,
  setSelectedComune,
  setProvinceOfBirth,
  setCap,
}: VirtualizedAutocompleteTypes) => {
  return (
    <Autocomplete
      freeSolo
      disableListWrap
      value={selectedComune}
      inputValue={placeOfBirth ? placeOfBirth : ""}
      onInputChange={(e, newInput) => {
        if (!e) {
          return;
        }
        setPlaceOfBirth(newInput);
      }}
      onChange={(e, comune) => {
        if (!comune) {
          setSelectedComune(null);
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
      onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
        setPlaceOfBirth(e.target.value.trim())
      }
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={comuni}
      renderInput={(params) => <TextField {...params} label={label} />}
      renderOption={(props, option, state) =>
        [props, option, state.index] as React.ReactNode
      }
      // TODO: Post React 18 update - validate this conversion, look like a hidden bug
      getOptionLabel={(comune) =>
        typeof comune === "string" ? comune : comune.nome
      }
    />
  );
};

export default VirtualizedAutocomplete;
