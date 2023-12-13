  uniform mat4 projectionMatrix;  //apply transformations relative to the Mest (Position,scale,rotation)
  uniform mat4 viewMatrix;  // apply transformations relative to the camera (position,rotation, field of view, near,far)
  uniform mat4 modelMatrix;  // transform the coordinates into the clip space cordinates
  uniform vec2 uFrequency;
  uniform float uTime;

  attribute vec3 position;
  attribute float aRandom;

  // varying float vRandom;


  void main()
  {
    vec4 modelPosition = modelMatrix * vec4( position, 1.0);
    modelPosition.z += sin( modelPosition.x * uFrequency.x - uTime ) * 0.1;
    modelPosition.z += sin( modelPosition.y * uFrequency.y - uTime ) * 0.1;
    // modelPosition.z += aRandom * 0.1;


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;


    gl_Position = projectedPosition;

    // vRandom = aRandom;
  }