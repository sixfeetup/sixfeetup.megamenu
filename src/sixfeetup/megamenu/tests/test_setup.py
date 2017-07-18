# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from plone import api
from sixfeetup.megamenu.testing import SIXFEETUP_MEGAMENU_INTEGRATION_TESTING  # noqa

import unittest


class TestSetup(unittest.TestCase):
    """Test that sixfeetup.megamenu is properly installed."""

    layer = SIXFEETUP_MEGAMENU_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')

    def test_product_installed(self):
        """Test if sixfeetup.megamenu is installed."""
        self.assertTrue(self.installer.isProductInstalled(
            'sixfeetup.megamenu'))

    def test_browserlayer(self):
        """Test that ISixfeetupMegamenuLayer is registered."""
        from sixfeetup.megamenu.interfaces import (
            ISixfeetupMegamenuLayer)
        from plone.browserlayer import utils
        self.assertIn(ISixfeetupMegamenuLayer, utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = SIXFEETUP_MEGAMENU_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')
        self.installer.uninstallProducts(['sixfeetup.megamenu'])

    def test_product_uninstalled(self):
        """Test if sixfeetup.megamenu is cleanly uninstalled."""
        self.assertFalse(self.installer.isProductInstalled(
            'sixfeetup.megamenu'))

    def test_browserlayer_removed(self):
        """Test that ISixfeetupMegamenuLayer is removed."""
        from sixfeetup.megamenu.interfaces import \
            ISixfeetupMegamenuLayer
        from plone.browserlayer import utils
        self.assertNotIn(ISixfeetupMegamenuLayer, utils.registered_layers())
