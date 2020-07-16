import React from 'react';
import Markdown from 'components/Common/Markdown';

export default () => (
  <Markdown fullWidth noPadding>
    {`
  # Building your first custom VCC

  ## Summary

  Visual Customization Controls (VCCs) enable users to quickly edit elements of your application on Koji. The Koji platform includes  VCCs for standard elements, such as images, text, and sounds. In addition, you can build custom VCCs to provide new types of customizations that match closely with the application you are developing. For example, some Koji templates provide tile map editors, sound enhancers, or custom avatar creators to enhance the interactivity for remixers.

  In this tutorial, you will build and publish a custom VCC that recreates the standard text VCC on Koji. After completing the tutorial, you will be able to use your custom VCC interchangebly with a text VCC.

  ## Prerequisites

  -  Familiarity with the Koji editor and remix process. For an overview, see the [starter guide](/developer/getting-started).
  -  Familiarity with React and ES6 basics are a plus.


  ## Setting up the consumer application

  To test and use your custom VCC, you need a Koji application to act as the "consumer" of it.

  1. Remix the following scaffold: https://withkoji.com/~seane/simple-react-scaffold.

  2. After the editor has loaded, rename the project. For example: \`Custom VCC Consumer\`.

  3. In **Customization**, open the \`Strings\` file.

  This file contains one option for \`Page Title\`, which uses a text VCC. You will replace this text VCC with custom VCC that you create in this tutorial.


  ## Setting up the custom VCC application

  Custom VCCs are also applications on Koji. You can create them in the same way that you create any application or game -- by remixing a scaffold.

  1. Remix the following scaffold: https://withkoji.com/~seane/react-project-no-vccs.

  2. After the editor has loaded, rename the project. For example: \`My Custom Text VCC\`.


  ## Adding the custom-vcc-sdk package

  The koji-custom-vcc-sdk package enables you to extend Koji applications with custom VCCs.

  1. At the bottom of the editor, click **New Tab** to open a new terminal tab.

  2. Navigate to the frontend folder: \`cd frontend\`.

  3. Install the package: \`npm install --save @withkoji/custom-vcc-sdk\`.

  4. Close the terminal tab: \`exit\`.

  5. In the \`frontend\` termimal tab, cancel the running process, and then restart it to reflect the change: \`npm start\`.

  6. Click the down arrow in the upper right to collapse the terminal pane.


  ## Adding a text input and state management

  The VCC must provide an input to accept a value from the user and a way to manage the state of the input value.

  1. Open \`/frontend/common/App.js\` from the file browser.

  2. In the App class, add a state property to store the value.

  \`\`\`javascript
  class App extends React.Component {
    state = { value: '' };
    ...
  \`\`\`

  3. Replace the contents of the \`<Container>\` component.

  \`\`\`javascript
  <Container>
    <input
      onChange={(e) => {
        this.setState({ value: e.currentTarget.value });
      }}
      value={this.state.value}
    />
  </Container>
  \`\`\`

  4. Save the file and refresh the live preview.

  You should see a text input in the preview window.


  ## Import the VCC package and initialize the custom VCC

  Next, use the koji-custom-vcc-sdk package you installed earlier to initialize the custom VCC and register it, so that the consumer knows it's ready to use.

  1. At the top of the \`App.js\` file, import the package:

  \`\`\`javascript
  import CustomVcc from '@withkoji/custom-vcc-sdk';
  \`\`\`

  2. In the App class, initialize the custom VCC.

  \`\`\`javascript
  customVcc = new CustomVcc();
  \`\`\`

  3. Add a \`componentDidMount\` method and register the VCC:

  \`\`\`javascript
  componentDidMount() {
    this.customVcc.register('300', '300');
  }
  \`\`\`


  ## Testing the custom VCC

  To save development time, Koji provides an easy way to test a custom VCC before it is published.

  1. In your custom VCC project, click the **Remote** tab in the right pane.

  2. Click **Copy URL** to get the staging URL for your project.

  3. Open your consumer project.

  4. In your consumer project, open the \`Strings\` customization file, and click **Code** to view the raw JSON.

  5. For the \`title\` field, change the \`type\` to match this format, using the URL you just copied as \`YOURURL\`:

  \`\`\`javascript
  "type": "custom<YOURURL>"
  \`\`\`

  6. Save the file, and return to the **Visual** view of the customization file.

  You should see your custom VCC.


  ## Connecting the custom VCC to the consumer

  If you type in your custom VCC in the consumer application, you will see that nothing happens yet. To support the dynamic customization updates of a Koji template, the custom VCC must be able to read and update the values in the JSON file of the consumer application.

  You can use methods exposed by the custom-sdk-vcc package to get the initial value from the JSON file and then to write a new value to the file when the user changes it in the VCC.

  ### Getting the value from the consumer

  In your custom VCC, use the \`onUpdate\` method to get the latest value from the JSON file in the consumer application.

  1. In the \`App.js\` file of your custom VCC application, add the following code to the \`componentDidMount\` method, after the \`register\` call:

  \`\`\`javascript
  this.customVcc.onUpdate(({ value }) => {
    this.setState({ value });
  });
  \`\`\`

  The \`componentDidMount\` method should now look like this example:

  \`\`\`javascript
  componentDidMount() {
    this.customVcc.register('300', '300');

    this.customVcc.onUpdate(({ value }) => {
      this.setState({ value });
    });
  }
  \`\`\`

  This code automatically updates the state of the VCC component when the value in the consumer application changes.

  2. Save the file, and return to your consumer application. Switch to the **Code** view, and then back to the **Visual** view to trigger a reload of your custom VCC.

  You should now see the correct value in the input.


  ### Setting a new value using the custom VCC

  In your custom VCC, use the \`change\` and \`save\` methods to send changes from the custom VCC to the consumer application.

  1. In the \`App.js\` file of your custom VCC application, update the \`onChange\` function for the input:

  \`\`\`javascript
  <input
    onChange={(e) => {
      this.customVcc.change(e.currentTarget.value);
      this.customVcc.save();
    }}
    value={this.state.value}
  />
  \`\`\`

  This code updates the value and triggers a save of the JSON file.

  2. Save the file, and return to your consumer application. Switch to the **Code** view, and then back to the **Visual** view to trigger a reload of your custom VCC.

  You should now be able to update the title of the application using your own custom VCC.


  ## Publishing your custom VCC

   The staging URL makes it easy to test a custom VCC while it is under development. However, it is temporary and changes each time you open a new instance of the project. Instead, you can publish your custom VCC so that you can use it in other projects and share it with other developers.

  1. In the left pane, navigate to **Advanced > Custom domains**.

  2. In the upper right, click **Add domain**.

  3. Under **Choose a Koji root domain**, select \`koji-vccs.com\`.

  4. In **Domain**, enter a unique name for your VCC. For example, \`myname-custom-text-vcc\`.

  You will use this name to implement your custom VCC in consumer applications.

  5. Click **Add**.

  6. In the left pane, click **Publish Now**. Give your VCC a descriptive name, and add a thumbnail if you would like.

  The name and thumbnail make it easier for other developers to find your custom VCC and understand what it does. For a VCC, a custom thumbnail might be a better representation of the functionality than the automatically generated screenshot.

  7. Click **Publish App**.


  ## Using a published custom VCC

  After your custom VCC has been published, you can use it by replacing the \`type\` in your VCC with the domain name you entered in the last step.

  \`\`\`javascript
  "type": "custom<YOURDOMAINNAME>"
  \`\`\`

  For example:

  \`\`\`javascript
  "type": "custom<myname-custom-text-vcc>"
  \`\`\`


  ## Refining your custom VCC

  You can refine the custom VCC by styling it to look more like a standard text VCC. In this example, we'll define new styling and use additional information from the consumer application to provide context to our custom VCC input.

  1. To be able to test your work in progress, open your consumer application and switch back to the staging URL of your custom VCC application.

  2. In the \`App.js\` file of your custom VCC application, remove the unused styled component (\`Image\`).

  3. Replace the \`Container\` styled component and add the following new styled components near the top of the file.

  \`\`\`javascript
  const InputContainer = styled.div\`
      display: flex;
      flex-direction: column;
      width: 100%;

      input {
          width: 100%;
          background-color: rgb(255, 255, 255);
          color: rgb(17, 17, 17);
          border-width: 1px;
          border-style: solid;
          border-color: rgba(0, 0, 0, 0.1);
          border-image: initial;
          border-radius: 0px;
          padding: 8px;
          outline: none;
      }

      input:focus {
          outline: none;
          border-width: 1px;
          border-style: solid;
          border-color: rgb(21, 122, 251);
          border-image: initial;
      }

      .description {
          width: 100%;
          opacity: 0.4;
          font-size: 12px;
          line-height: 1;
          padding-top: 4px;
      }
  \`;

  const Container = styled.div\`
      background-color: #ffffff;
      color: #000000;
      padding: 16px;
      display: flex;
      align-items: start;
      width: calc(100% - 40px);
  \`;

  const Label = styled.label\`
      display: inline-flex;
      flex-direction: column;
      align-items: flex-end;
      padding-right: 16px;

      .name {
          font-size: 14px;
      }

      .variable-name {
          font-size: 10px;
          line-height: 1.5;
          color: rgb(102, 102, 102);
          opacity: 0.9;
          font-family: Menlo, Monaco, "Courier New", monospace;
      }
  \`;
  \`\`\`

  4. Update the state assignment to add the following properties.

  \`\`\`javascript
  state = {
    description: '',
    name: '',
    value: '',
    variableName: '',
  };
  \`\`\`

  5. Update the \`onUpdate\` command to set the values of the additional properties with information from the consumer application.

  \`\`\`javascript
  this.customVcc.onUpdate(({ value, name, variableName, description }) => {
    this.setState({
        description,
        name,
        value,
        variableName,
    });
  });
  \`\`\`

  6. Replace the contents of the \`<Container>\` component with the updated input.

  \`\`\`javascript
  <Label>
      <div className="name">{this.state.name}</div>
      <div className="variable-name">{this.state.variableName}</div>
  </Label>
  <InputContainer>
      <input
          onChange={(e) => {
              this.customVcc.change(e.currentTarget.value);
              this.customVcc.save();
          }}
          value={this.state.value}
      />
      <div className="description">{this.state.description}</div>
  </InputContainer>
  \`\`\`

  7. Save the \`App.js\` file, return to your consumer application, and reload the VCC.

  You should see an updated VCC that looks just like the standard text VCC.

  8. Publish your changes to update the presentation of your custom VCC.


  ## Wrapping up

  You've now created a replacement for an existing text VCC and learned the basics of how a custom VCC "talks" to the consumer application.

  If you want to create more complex custom VCCs, you can find more information in the [package documentation](https://github.com/madewithkoji/koji-custom-vcc-sdk).

  You can also find existing custom VCCs by searching for "vcc" on https://withkoji.com.
    `}
  </Markdown>
);
