# Quick Reference

-   Repo
    -   SSH: git@bitbucket.org:illfittingshoes/publas.git
    -   HTTPS: <https://illfittingshoes@bitbucket.org/illfittingshoes/publas.git>
    -   Web: <https://bitbucket.org/illfittingshoes/publas>
-   Supporting Resources
    -   [Vagrant](https://www.vagrantup.com/downloads.html)
    -   [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
        -   For Windows 10 (v5.0.2, released on 2015/08/13, still doesn't officially support Windows 10):
            -   [VirtualBox 4.3.30](http://download.virtualbox.org/virtualbox/4.3.30/VirtualBox-4.3.30-101610-Win.exe)
            -   ["Fix" exe](https://www.virtualbox.org/attachment/ticket/14040/VBox-Win10-fix-14040.exe)
                -   Instructions: Run fix as admin, "vagrant up", close fix after VM is up
    -   [TrustyDouglas Files](https://onedrive.live.com/?cid=3928ae49b59f09d7&id=3928AE49B59F09D7!204490&ithint=folder,ppk&authkey=!AJvzMoBI4-a0ftA)
        -   TrustyDouglas boxes
        -   Vagrant PuTTY SSH key
    -   [Cmder](http://gooseberrycreative.com/cmder/) (Windows) for awesome console (use msysgit version for great Git & \*nix justice!)

# Dev Platform Details

**You don't have to use vagrant**, it should work, but I don't use it. Instead of doing all this junk below, you can simply run:

```
npm install
```

If that goes well, you can then run:

```
npm run dev
```

And you should be up and running.

## Vagrant setup:

Using [Vagrant](https://www.vagrantup.com/) to provision and manage a [VirtualBox](https://www.virtualbox.org/) VM of [Ubuntu Trusty Tahr](http://ubuntuguide.org/wiki/Ubuntu_Trusty) (CLI-only).

### Benefits

-   No specific setup/environment-based surprises:
    -   Identical OS, updates, settings, and privileges, for everybody
    -   Identical Software and Packages/dependency versions, for everybody
    -   Same/Close enough environment to what will be hosted
-   Host platform agnostic
-   Any Host PC gains access to OS-exclusive packages like Flow that are only available on Mac or Linux (fucking bastards)
-   Dev and test easily from any computer you can install VirtualBox and Vagrant on:
    -   Test locally on various machines
    -   Keep coding PCs pristine
        -   Only install packages that actively help you code, like linters or static type checkers
        -   No global dependency fights between projects!
            -   Python 2.7.x vs 3+
            -   Node & Node Packages
            -   Low-level shit like libsass

Note: This Vagrant setup will work great for any node.js-based project

### Host PC Requirements

-   64bit x86 CPU beefy enough to host a VM
    -   Pretty much anything since 2010, and many before
    -   Hardware virtualization acceleration probably wouldn't hurt for speed :)
-   64bit OS (I think?)
-   4GB RAM
    -   Might get away with as little as 2GB - 1GB for host, 1GB for Box
        -   Box is set to 2GB via Vagrantfile
            -   Fails at Vagrant default of 512MB
            -   Haven't tested anything between 512MB and 2GB
-   Admin privileges
    -   To install stuff. VirtualBox even requires a restart in Windows, so you KNOW it's serious

## File structure

### On the Host

`[/Path/To/Douglas Projects]/douglas-main/`

### Inside the Vagrant Box

`/vagrant/`

## Install the Environment

These instructions are based on a Windows environment, but it should work in Mac as well. Settings locations may be slightly different for things like VirtualBox GUI


1.  [Install VirtualBox](https://www.virtualbox.org/wiki/Downloads)
    1.  Configure VM location if you want
        -   File -&gt; Preferences -&gt; General -&gt; "Default Machine Folder"

    2.  Restart PC

2.  [Install Vagrant](https://www.vagrantup.com/downloads.html)
3.  [Download newest TrustyDouglas base box](http://1drv.ms/1GXui8K)
4.  Add TrustyDouglas to Vagrant
    -   `"vagrant box add trustyDouglas /path/to/trusty-douglas.box"`

5.  [Install Git](http://www.git-scm.com/) if you don't have it already
    -   Technically optional, as you can download the repo files directly, but come on ;)

6.  FIRE IT UP
    1.  Open shell/command prompt and navigate to desired Douglas projects folder (e.g. /`path/to/douglas-projects/`)
    2.  Clone repo
        1.  git clone git@bitbucket.org:DouglasApp/douglas-main.git

    3.  Go into newly minted project folder (e.g. `/path/to/douglas-projects/douglas-main/`)
    4.  ` "vagrant up"`
    5.  Give it a minute
        1.  Once you're returned to the command prompt, you're good
        2.  You can verify with "`vagrant status`"

 

Windows 10 Note

VirtualBox, for our purposes, has an issue with Windows 10. In the support ticket, a dev blames MS for not getting Win10 into MSDN soon enough, something about licenses for the Windows Insider program... Anyway, as of August 14, 2015, **VirtualBox cannot fucking deal with assigning a host-only adapter in Windows 10**, but there's a workaround until proper Win10 support lands (v5.0.2+):

1.  Download [this hacky fix](https://www.virtualbox.org/attachment/ticket/14040/VBox-Win10-fix-14040.exe)
2.  Every time you need to "`vagrant up`":
    1.  Run the fix **as an administrator**
    2.  "`vagrant up`"
    3.  Once `vagrant up` is finished, close the fix

## ENTER THE BOX

### Option 1: Shell/Command Prompt

1.  Navigate to `/path/to/Douglas Projects/douglas-main` in shell/command prompt
2.  "vagrant ssh"

### Option 2 (Windows): PuTTY

Adapted from [here](https://github.com/Varying-Vagrant-Vagrants/VVV/wiki/Connect-to-Your-Vagrant-Virtual-Machine-with-PuTTY)


1.  [Download Putty](http://www.chiark.greenend.org.uk/%7Esgtatham/putty/download.html) if you don't have it (and PuTTYgen if you want to do that step yourself)
2.  Get PuTTY private key. Either:
    -   [Download already-converted PPK version](http://1drv.ms/1GXui8K) (vagrant-insecure\_private\_key.ppk) and put it in ~/.ssh/ or wherever
    -   or follow PuTTYgen-related directions [here](https://github.com/Varying-Vagrant-Vagrants/VVV/wiki/Connect-to-Your-Vagrant-Virtual-Machine-with-PuTTY) and put it in ~/.ssh/ or wherever

3.  Optional PuTTY Awesomtronification
    1.  EXTREMELY recommended: replace super annoying beeping with visual shaking
        -   "Terminal -&gt; Bell" screen -&gt; Set the style of bell
            -   Visual bell (flash window)

    2.  Highly recommended: make PuTTY pretty and more helpful
        -   Use either this: <http://ethanschoonover.com/solarized>
            1.  Add registry entry by double-clicking downloaded .reg file and saying "yes" to prompt
            2.  Load "Solarized \[Dark|Light\]" Session as starting point
            3.  Set font to something nicer than Courier New, like Consolas or Lucida Console
        -   Or the more comprehensive and defaults-setting: <https://github.com/jblaine/solarized-and-modern-putty>
        -   Or some other starting point

4.  Configure new session:
    1.  "Window -&gt; Translation" screen
        -   Remote character set: **UTF-8**

    2.  "Connection -&gt; Data" screen
        -   Auto-login username: **vagrant**

    3.  "Connection -&gt; SSH -&gt; Auth" screen
        -   Private key file for authentication: &lt;**browse** to PuTTY private key you just downloaded or converted&gt;

    4.  "Session" screen (first/default screen)
        -   Host Name: **127.0.0.1**
        -   Port: **2222**
        -   Connection type: **SSH**
        -   Saved Sessons: Enter "**Vagrant Douglas**" (or whatever you want)
        -   **Click Save**

5.  Connect!
    1.  On the "Session" screen: double-click on the Vagrant Douglas (or whatever you named it)

## Install Project

All these steps are done INSIDE THE BOX unless stated otherwise

1.  Navigate to the shared folder
    -   `"cd /vagrant/"`
    -   To illustrate shared-ness:
        1.  `"ls -a"` to list all files, including "hidden dot files"
        2.  On the host machine, open a file explorer window to the project folder (e.g. `/path/to/douglas-projects/douglas-main/`)
        3.  BEHOLD: they are the same

2.  `"npm install"`
    -   NOTE: On Windows: `"npm install --no-bin-links"` due to weird symlink/shared drive issue

3.  "`bower install`"

That's it!

## Running the Dev Server and Viewing Site

1.  INSIDE THE BOX
    1.  Navigate to project (`/vagrant/`)
    2.  "`gulp`"

2.  On the Host
    1.  Point a browser to the testing location
        -   Default: `http://localhost:5000`

    2.  BrowserSync settings can be found on their own ports at localhost

## Working With Project

Development spans two environments (Host and Vagrant Box), so we'll address each one in turn

### Vagrant Box

Default "`gulp`" command is aimed at development:

1.  Builds dev version
    -   Commented and unminified
    -   Sourcemaps
    -   Any debug-specific options enabled

2.  Lint & Run Unit Tests
3.  Watch for changes and update
    -   App & Markup changes recompile and reload all connected browsers
    -   Style changes inject updated styles directly

All status, results, errors, etc. is output to SSH terminal.

There are a few tasks that aren't part of the gulp build:

-   Flow
    -   Gulp integration is broken - takes forever, and runs against outdated files on save/watch triggered runs
-   Stylint
    -   Gulp integration is broken
-   MongoDB
    -   We aren't using it yet, but it is likely we'll not include it in Gulp, and run it separately instead

The integration process looks like this right now (from `/vagrant/`):

1.  "`gulp`"
    -   No ESLint errors
    -   No Mocha errors

2.  "`stylint`"
    -   No errors

3.  "`flow`"
    -   No errors

4.  git stuff

### Host

-   **Working Directory:**
    -   Vagrant-shared project folder, e.g. `/path/to/Douglas Projects/douglas-main/`
-   **Editor/IDE Tooling**
    -   Required:
        -   Babel syntax support
            -   React support
        -   Stylus syntax support
        -   ESLint
            -   React support
            -   Bonus for free: ESLint consumes the .eslintrc config file automatically
                -   It may be universal, but definitely in Sublime (as a plugin for SublimeLinter)
    -   Useful:
        -   Stylint
        -   Flow (on Mac or Linux)
-   **Workflow**
    -   TODO?

## Vagrant VM Commands

Technically, this Vagrant box is a VM running in VirtualBox. However, when it comes to certain key tasks like turning it on, restarting it, or installing new software, you will want to interact with it only via Vagrant CLI commands.

Action

Command

Action

Command

Shut down and power off
`vagrant halt `
Restart
`vagrant reload `
Turn On
`vagrant up `
Suspend
`vagrant suspend`
Resume
`vagrant resume`

## Notes, of Descending Importance

1.  The VM is configured for 1 CPU and 2048MB aka 2GB of RAM. To change these values, edit Vagrantfile
    -   The easiest way to keep a modified Vagrantfile than what is in the repo is to [tell git to assume it's unchanged](http://stackoverflow.com/questions/3319479/git-can-i-commit-a-file-and-ignore-the-content-changes):
        -   git update-index --assume-unchanged Vagrantfile

        -   I don't know Git well enough to know if this index can be pushed to everybody
            -   If it can, we'll just do that at some point, so this doesn't have to be done manually by each person

2.  Included software (pre-provisioned, and in addition to whatever comes with the Ubuntu/Trusty64 base box)
    -   Git
    -   MongoDB
    -   Flow static type checker (by Facebook, \*nix-only)
    -   Node.js (latest stable - 0.12.x at the time of writing)
        -   NPM 3+
        -   gulp
        -   babel
        -   stylint
        -   bower

3.  There is a good way available with Vagrant to spin up multiple environments, governed by the same Vagrantfile
    -   Potential uses include:
        -   Simulate distributed server architecture
            -   Web server
            -   DB server
        -   Dev & Test environments
            -   Ensure "production" build process doesn't break
            -   Test "production" performance relative to dev performance
        -   Integration of UI mocks
            1.  Keep UI mock "stub" in Vagrantfile
            2.  Cut a branch from Core
            3.  Put active UI mock into the mix
            4.  Move over and test from the same code-base
            5.  Revert UI mock stub
            6.  Merge updated Core

4.  On Windows, I like to use **[Cmder](http://gooseberrycreative.com/cmder/)** instead of the default Command Prompt. It has a msysgit version, and is pretty, portable, and very customizable
5.  Where the Vagrant-based VM files really live:
    -   Vagrant caches the base boxers locally in `~/.vagrant.d/boxes/`
    -   The actual resulting VMs themselves are spun up through VirtualBox directly, wherever VirtualBox is set to put them. You can even open up VirtualBox to see the VM, its status, and its settings
