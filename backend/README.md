#Server

## Setup

1.  Set up a new pi
    1. Obtain the [Raspberry Pi Imager](https://www.raspberrypi.org/software/)
    2. Run it
    3. Set the OS to 'Raspberry PI OS (other)>Raspberry PI OS Lite
    4. using the advanced menu `ctrl-shift-x`
       1. set hostname to `moneypi`
       2. enable ssh and set up the password
       3. set up your locale settings, skipping first run wizard
       4. disable telemetry
    5. Create the image
    6. Boot up with ethernet plugged in and wait 1-5 min
    7. connect to the pi by using the ssh, pi@moneypi
    8. run:
    ```bash
    sudo apt update
    sudo apt upgrade -y
    curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt update
    sudo apt install -y nodejs git
    echo 'NODE_ENV=production' | sudo tee -a /etc/environment >/dev/null
    # source /etc/environment
    # sudo npm install pm2@latest -g
    # pm2 startup systemd
    # sudo env PATH=\$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi
    # sudo systemctl start pm2-pi
    # pm2 install pm2-logrotate
    # source /etc/environment
    ```
