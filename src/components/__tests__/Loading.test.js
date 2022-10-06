import { render, screen } from "@testing-library/react";
import Loading from "../Loading";

describe('Testing Loading component', () => {

  it('should render backdrop and spinner when loading', async () => {
    render(<Loading open={true}/>);
    
    expect(screen.getByTestId('loading-backdrop-progress')).toBeVisible();
  });
  
  it('should disappear when loading finished', async () => {
    render(<Loading open={false}/>);
    
    expect(screen.getByTestId('loading-backdrop-progress')).not.toBeVisible();
  });
});
