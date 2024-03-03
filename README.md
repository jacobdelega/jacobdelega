## React fundamental notes:

* Components - A piece of the UI that has its own logic and appearance.
    - Example: Login, Signup for user authentication and account created

    * Facts: 
        - component can be a button, or as large as an entire page
        - component can return multiple JSX tags.... [Notice the empty <></>]
        ```
            function AboutPage() {
                return (
                    <>
                        <h1>About</h1>
                        <p>Hello there.<br />How do you do?</p>
                    </>
                );
            }
        ```
* Condition Rendering - Think of a way of restricting based on needed parameters [Same as flask!]
    - One common approach less compact
        ```
        let content;
        if (isLoggedIn) {
            content = <AdminPanel />;
        } else {
            content = <LoginForm />;
        }
        return (
            <div>
                    {content}   
            </div>
        );
        ```
    - Second approach more compact
        ```
        <div>
            {isLoggedIn ? (
                <AdminPanel />
            ) : (
                <LoginForm />
            )}
        </div>
        ```

* useState