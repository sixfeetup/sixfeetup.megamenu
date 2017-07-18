from plone.theme.interfaces import IDefaultPloneLayer
from zope.interface import Interface


class IMegamenuSpecific(IDefaultPloneLayer):
    """Marker interface that defines a Zope 3 browser layer.
    """


class IMegamenuViewlet(Interface):
    """ Marker interface.
        Implements new functionality to global navigation that lets you to
        have dropdown menus for global navigation tabs. Dropdown menu is
        builded with navigation portlet's policy, so dropdowns contain items
        that are only allowed for navigation portlet. If the item is disabled
        for navigation portlet, it is disabled for dropdown menu automatically
    """

    def getTabObject(tabUrl=''):
        """Get the submenu tree for tab object"""
