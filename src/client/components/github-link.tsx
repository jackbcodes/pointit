import { Icons } from '~/components/icons';
import { buttonVariants } from '~/components/ui/button';

export function GitHubLink() {
  return (
    <a
      href="https://github.com/jackbcodes/pointit"
      target="_blank"
      rel="noreferrer"
      className={buttonVariants({
        variant: 'ghost',
        size: 'icon',
      })}
    >
      <Icons.gitHub className="h-5 w-5" />
      <span className="sr-only">GitHub</span>
    </a>
  );
}
