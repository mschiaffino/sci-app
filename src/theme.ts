import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const theme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        h4: 'h1',
        h5: 'h2',
        h6: 'h3',
        subtitle1: 'h4',
        subtitle2: 'h5',
        body1: 'span',
        body2: 'span',
      },
    },
  },
});
