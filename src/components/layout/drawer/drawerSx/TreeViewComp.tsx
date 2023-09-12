import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/lab";
import { MenuItem } from "src/components/CommonTypesInterfaces";
// Componente TreeViewItem

type TreeViewCompProps = {
  menuItem: MenuItem;
};

export function TreeViewComp({ menuItem }: TreeViewCompProps) {
  return (
    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      <TreeViewItem menuItem={menuItem} />
    </TreeView>
  );
}

function TreeViewItem({ menuItem }: TreeViewCompProps) {
  return (
    <TreeItem key={menuItem.id} nodeId={menuItem.id} label={menuItem.label} onClick={menuItem.onClick ? menuItem.onClick : () => {}}>
      {menuItem.subItems && menuItem.subItems.length > 0 && menuItem.subItems.map((subItem) => <TreeViewItem key={subItem.id} menuItem={subItem} />)}
    </TreeItem>
  );
}
