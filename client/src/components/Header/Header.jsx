import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    cursor: 'pointer',
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const Header = ({ sections, title, user, signout }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <IconButton>
          <ArrowBackIcon
            onClick={() => {
              history.goBack();
            }}
          />
        </IconButton>
        <Typography
          className={classes.toolbarTitle}
          component='h2'
          variant='h5'
          color='inherit'
          align='center'
          noWrap
          onClick={() => {
            history.push('/');
          }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {user ? (
          <Button
            variant='outlined'
            size='small'
            onClick={() => {
              signout();
            }}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            variant='outlined'
            size='small'
            onClick={() => {
              history.push('/signin');
            }}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
      <Toolbar
        className={classes.toolbarSecondary}
        component='nav'
        variant='dense'
      >
        {sections.map((section) => (
          <Link
            className={classes.toolbarLink}
            color='inherit'
            noWrap
            key={section.title}
            variant='body2'
            onClick={() => {
              history.push(section.path);
            }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </>
  );
};

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};

export default Header;
