var UI = UI || {}

//////////////////////////////////////////////////////////////////////////////////
//              Constructor                                                     //
//////////////////////////////////////////////////////////////////////////////////


// create a plane on which we map 2d text


UI.BadgeSprite = function() {
    var width = 596 //remove: set to dementions of 8.5 inch paper. was 512, changes px per canvas size????
    var height = 842 //remove: set to dementions of 11 inch paper. was 256

    var canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    this.canvas = canvas

    //Store width and height
    this.textureWidth = width;
    this.textureHeight = height;


    var context = canvas.getContext('2d')
    this.context = context

    var texture = new THREE.Texture(canvas)
    this.texture = texture


    // Create the object
    var material = new THREE.SpriteMaterial({
        transparent: true,
        map: texture
    });
    THREE.Sprite.call(this, material)

    this.scale.set(3.25, 4, 1) //remove: (2,1,1) changes size of canvas relative to scan image
}

UI.BadgeSprite.prototype = Object.create(THREE.Sprite.prototype);


// Draw the cartouche
// @param  {Object} params [description]

UI.BadgeSprite.prototype.draw = function(params) {
    var context = this.context
    var canvas = this.canvas
    var texture = this.texture

    context.save()

    // clear texture
    context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Draw white background
    var cornerRadius = 10;
    context.fillStyle = 'rgba(250,250,250, .95)';
    context.fillRect(0 + (cornerRadius / 2), 0 + (cornerRadius / 2), canvas.width - cornerRadius, canvas.height - cornerRadius);

    // Draw background outlining
    context.lineJoin = 'round';
    context.lineWidth = 5;
    context.strokeStyle = '#3D3D3B';
    context.strokeRect(0 + (cornerRadius / 2), 0 + (cornerRadius / 2), canvas.width - cornerRadius, canvas.height - cornerRadius);

    // Draw avatar
    var avatarObject = new Image();
    avatarObject.width = 200;
    avatarObject.height = 50;
    avatarObject.style.width = '200px';
    avatarObject.style.height = '50px';
    avatarObject.onload = function() {
        context.drawImage(avatarObject, 200, 20, 200, 50);
        // make the texture as .needsUpdate
        texture.needsUpdate = true;
    };
    avatarObject.src = params.avatar;
    avatarObject.crossOrigin = 'Anonymous';

    // draw avatar outlining
    // context.rect(10, 10, 200, 50);
    // context.lineWidth = 10;
    // context.strokeStyle = '#F7901E';
    // context.stroke();

    //----------------------------------
    var width = 550;//596
    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            writeText(line, (x+15), y, 15, 'normal');
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        writeText(line, (x+15), y, 15, 'normal');
      }
    //var x for text wrapText function
    var x = (width - 500) / 2;

    // Write firstEvent
    writeText(params.firstEvent, 30, 120, 20, 'normal');
    // write secondEvent
    writeText(params.secondEvent, 30, 160, 20, 'normal');
    // write thirdEvent
    writeText(params.thirdEvent, 30, 200, 20, 'normal');
    // write thirdDescription
    wrapText(context, params.thirdDescription, x, 230, width, 25);
    // write fourthEvent
    writeText(params.fourthEvent, 30, 300, 20, 'normal');
    // write fourthDescription
    wrapText(context, params.fourthDescription, x, 330, width, 25);
    // write fifthEvent
    writeText(params.fifthEvent, 30, 420, 20, 'normal');
    // write fifthDescription
    wrapText(context, params.fifthDescription, x, 450, width, 25);

    // Write role label
    //writeText(params.role, 270, 215, 35, 'bold');

    // Draw role icon
    var iconObject = new Image();
    iconObject.width = 50;
    iconObject.height = 50;
    iconObject.style.width = 50 + 'px';
    iconObject.style.height = 50 + 'px';
    iconObject.onload = function() {
        context.drawImage(iconObject, 220, 170, 50, 50);

        // make the texture as .needsUpdate
        texture.needsUpdate = true;
    }
    if (params.role.toLowerCase() === 'developer') {
        iconObject.src = '/breakout-rooms/breakout-room-ar/role-icons/developer.png';
    } else if (params.role.toLowerCase() === 'designer') {
        iconObject.src = '/breakout-rooms/breakout-room-ar/role-icons/designer.png';
    } else if (params.role.toLowerCase() === 'industry') {
        iconObject.src = '/breakout-rooms/breakout-room-ar/role-icons/industry.png';
    } else {
        iconObject.src = '/breakout-rooms/breakout-room-ar/role-icons/other.png';
    }

    // restore context
    context.restore()

    // make the texture as .needsUpdate
    texture.needsUpdate = true;

    //return //remove: if no bugs detected in testing


    function writeText(text, positionX, positionY, size, weight) {

        context.font = weight + ' ' + size + 'px Arial';

        context.fillStyle = '#000';
        context.fillText(text, positionX + 1, positionY + 1);

        context.fillStyle = '#333333';
        context.fillText(text, positionX, positionY);
    }
}
