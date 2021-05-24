## Container IsEmptyFunctions 

Exports the is empty functions for the spa editor module.
Provided as a separate module, so that lazy loading / code splitting can work properly.

You want to import the is empty functions in your main module, but you do not want to import the actual components in your main module.

Flow is as follows for lazyloaded components:

* Spa editor gets a model entry with a component

* Spa editor evaluates the isEmptyFunction

* If false, discards, if true, executes dynamic import

* Component is displayed