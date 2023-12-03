import { ColorModeToggle } from '~/components/color-mode-toggle';
import { GitHubLink } from '~/components/github-link';
import { Icons } from '~/components/icons';

export function Header() {
  return (
    <header className="container flex items-center justify-between py-4">
      <a href="/">
        <Icons.logo className="h-9" />
      </a>
      <div className="flex items-center space-x-2">
        <GitHubLink />
        <ColorModeToggle />
      </div>
    </header>
  );
}
