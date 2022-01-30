import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';


// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';


// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(

  ({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: ' ',
    textTransform: 'capitalize',

    paddingLeft: theme.spacing(1.8),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,
    '&:before': {

      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: 'none',
      position: 'absolute',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.success.main
    }
  })
);

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',


});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func
};

function NavItem({ setState, item, active, matches }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);



  const activeRootStyle = {
    color: '#229A16',

    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.success.light, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' }
  };
  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
        height: 70
      }}
      onClick={() => {
        if (title === "Logout") {
          alert("You are logout successfully")
        }
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      {matches ? <ListItemText disableTypography primary={title} /> : null}
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array
};

export default function NavSection({ setState, navConfig, ...other }) {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener('change', e => setMatches(e.matches));
  }, []);
  const { pathname } = useLocation();
  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item, index) => (
          <NavItem matches={matches} setState={setState} key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
