import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    cursor: 'pointer',
  },
  toolbarSecondary: {
    overflowX: 'auto',
  },
  toolbarInner: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    cursor: 'pointer',
  },
  btn: {
    margin: '0.1rem',
  },
}));

const Header = ({ sections, title, user, signout }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Container className={classes.toolbarInner}>
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

          <div>
            {/* Admin */}
            {user && user.role ? (
              <Button
                className={classes.btn}
                variant='outlined'
                size='small'
                onClick={() => {
                  history.push('/product/upload');
                }}
              >
                Upload
              </Button>
            ) : null}
            {/* Signed User */}
            {user && (
              <Button
                className={classes.btn}
                variant='outlined'
                size='small'
                onClick={() => {
                  signout();
                }}
              >
                Sign Out
              </Button>
            )}
            {/* Unsigned User */}
            {!user && (
              <Button
                className={classes.btn}
                variant='outlined'
                size='small'
                onClick={() => {
                  history.push('/signin');
                }}
              >
                Sign In
              </Button>
            )}
            {!user && (
              <Button
                className={classes.btn}
                variant='outlined'
                size='small'
                onClick={() => {
                  history.push('/register');
                }}
              >
                Register
              </Button>
            )}
          </div>
        </Container>
      </Toolbar>
      <Toolbar
        className={classes.toolbarSecondary}
        component='nav'
        variant='dense'
      >
        <Container className={classes.toolbarInner}>
          <IconButton
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowBackIcon />
          </IconButton>
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
        </Container>
      </Toolbar>
    </>
  );
};

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};

export default Header;
