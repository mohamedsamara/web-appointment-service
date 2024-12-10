import { ElementType, forwardRef } from "react";
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { SvgIconProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";

export type NavItem = {
  route: string;
  name?: string;
  icon?: ElementType<SvgIconProps>;
  end?: boolean;
};

export type Props = {
  item: NavItem;
  tooltip?: boolean;
};

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => {
  return <StyledNavLink ref={ref} {...props} />;
});

const StyledNavLink = styled(RouterNavLink)(({ theme }) => ({
  "&.active": {
    backgroundColor: theme.palette.action.selected,

    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },

    "&:focus": {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

const NavListItem = (props: Props) => {
  const { tooltip, item } = props;
  const { route, end, name, icon } = item;
  const NavIcon = icon ? icon : null;

  const iconOnly = NavIcon && tooltip;

  const content = (
    <ListItemButton
      component={NavLink}
      to={route}
      end={end}
      sx={[
        {
          minHeight: 48,
          px: 2.5,
          "&.active": {
            backgroundColor: (theme) => theme.palette.action.selected,
            color: (theme) => theme.palette.primary.main,
          },
        },
      ]}
    >
      {NavIcon && (
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: "center",
            marginRight: !iconOnly ? 2 : 0,
          }}
        >
          <NavIcon color="primary" />
        </ListItemIcon>
      )}
      {!tooltip && <ListItemText primary={name} />}
    </ListItemButton>
  );

  return tooltip ? (
    <Tooltip title={name} key={route} arrow placement="right">
      {content}
    </Tooltip>
  ) : (
    content
  );
};
export default NavListItem;
