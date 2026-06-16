const { execSync } = require('child_process');

try {
  execSync('git rebase -i --root', {
    stdio: 'pipe',
    input: 'drop edaca90\npick ee087f2\npick a427c68\npick 180e697\n'
  });
  console.log('Rebase completed');
} catch (e) {
  console.log('Rebase output:', e.stdout?.toString() || e.message);
}
