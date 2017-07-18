# -*- coding: utf-8 -*-
from plone.app.contenttypes.testing import PLONE_APP_CONTENTTYPES_FIXTURE
from plone.app.robotframework.testing import REMOTE_LIBRARY_BUNDLE_FIXTURE
from plone.app.testing import applyProfile
from plone.app.testing import FunctionalTesting
from plone.app.testing import IntegrationTesting
from plone.app.testing import PloneSandboxLayer
from plone.testing import z2

import sixfeetup.megamenu


class SixfeetupMegamenuLayer(PloneSandboxLayer):

    defaultBases = (PLONE_APP_CONTENTTYPES_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        # Load any other ZCML that is required for your tests.
        # The z3c.autoinclude feature is disabled in the Plone fixture base
        # layer.
        self.loadZCML(package=sixfeetup.megamenu)

    def setUpPloneSite(self, portal):
        applyProfile(portal, 'sixfeetup.megamenu:default')


SIXFEETUP_MEGAMENU_FIXTURE = SixfeetupMegamenuLayer()


SIXFEETUP_MEGAMENU_INTEGRATION_TESTING = IntegrationTesting(
    bases=(SIXFEETUP_MEGAMENU_FIXTURE,),
    name='SixfeetupMegamenuLayer:IntegrationTesting'
)


SIXFEETUP_MEGAMENU_FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(SIXFEETUP_MEGAMENU_FIXTURE,),
    name='SixfeetupMegamenuLayer:FunctionalTesting'
)


SIXFEETUP_MEGAMENU_ACCEPTANCE_TESTING = FunctionalTesting(
    bases=(
        SIXFEETUP_MEGAMENU_FIXTURE,
        REMOTE_LIBRARY_BUNDLE_FIXTURE,
        z2.ZSERVER_FIXTURE
    ),
    name='SixfeetupMegamenuLayer:AcceptanceTesting'
)
